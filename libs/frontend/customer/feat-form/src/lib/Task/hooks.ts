import { setTimeForDateFromString } from '@remind-me/frontend/customer/util-date';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { Task } from '@remind-me/shared/util-task';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TaskFormData } from './types';
import { extractTime } from './utils';

export const useCreateTaskForm = ({
  start,
  end,
  onSave,
}: {
  start: Date;
  end: Date;
  onSave?: () => void;
}) => {
  const formReturn = useForm<TaskFormData>({
    defaultValues: {
      startTime: extractTime(start),
      endTime: extractTime(end),
    },
  });

  useEffect(() => {
    formReturn.setValue('startTime', extractTime(start));
    formReturn.setValue('endTime', extractTime(end));
  }, [start, end, formReturn]);

  const createTaskMutation = trpc.task.createTask.useMutation({
    onSuccess: () => {
      formReturn.reset();
      onSave && onSave();
    },
  });

  const saveForm = async (formData: TaskFormData) => {
    const startDateTime = setTimeForDateFromString(formData.startTime, start);
    const endDateTime = setTimeForDateFromString(formData.endTime, end);

    await createTaskMutation.mutateAsync({
      name: formData.name,
      locationId: formData.locationId,
      startDate: startDateTime,
      endDate: endDateTime,
    });
  };

  return {
    formReturn,
    onSubmit: formReturn.handleSubmit(saveForm),
    isLoading: createTaskMutation.isLoading,
  };
};

function makeFormFromTask(task: Task): TaskFormData {
  return {
    name: task.name,
    locationId: task.locationId,
    startTime: extractTime(task.startDate),
    endTime: extractTime(task.endDate),
  };
}

export const useEditNonRecurringTaskForm = ({
  task,
  onSave,
}: {
  task: Task | null;
  onSave?: () => void;
}) => {
  const formReturn = useForm<TaskFormData>({
    ...(task && {
      values: makeFormFromTask(task),
    }),
  });

  const updateTaskMutation = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      formReturn.reset();
      onSave && onSave();
    },
  });

  const saveForm = async (formData: TaskFormData) => {
    if (task) {
      await updateTaskMutation.mutateAsync({
        where: {
          id: task.id,
        },
        data: {
          name: formData.name,
        },
      });
    }
  };

  return {
    formReturn,
    onSubmit: formReturn.handleSubmit(saveForm),
    isLoading: updateTaskMutation.isLoading,
  };
};
