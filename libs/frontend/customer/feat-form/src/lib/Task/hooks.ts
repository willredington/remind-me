import { setTimeForDateFromString } from '@remind-me/frontend/customer/util-date';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { NonRecurringTask } from '@remind-me/shared/util-task';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NonRecurringTaskFormData } from './types';
import { extractTime } from './utils';

export const useCreateNonRecurringTaskForm = ({
  start,
  end,
  onSave,
}: {
  start: Date;
  end: Date;
  onSave?: () => void;
}) => {
  const formReturn = useForm<NonRecurringTaskFormData>({
    defaultValues: {
      startTime: extractTime(start),
      endTime: extractTime(end),
    },
  });

  useEffect(() => {
    formReturn.setValue('startTime', extractTime(start));
    formReturn.setValue('endTime', extractTime(end));
  }, [start, end, formReturn]);

  const createNonRecurringTaskMutation =
    trpc.task.createNonRecurringTask.useMutation({
      onSuccess: () => {
        formReturn.reset();
        onSave && onSave();
      },
    });

  const saveForm = async (formData: NonRecurringTaskFormData) => {
    const startDateTime = setTimeForDateFromString(formData.startTime, start);
    const endDateTime = setTimeForDateFromString(formData.endTime, end);

    await createNonRecurringTaskMutation.mutateAsync({
      name: formData.name,
      locationId: formData.locationId,
      start: startDateTime,
      end: endDateTime,
    });
  };

  return {
    formReturn,
    onSubmit: formReturn.handleSubmit(saveForm),
    isLoading: createNonRecurringTaskMutation.isLoading,
  };
};

function makeFormFromTask(task: NonRecurringTask): NonRecurringTaskFormData {
  return {
    name: task.name,
    locationId: task.locationId,
    startTime: extractTime(task.start),
    endTime: extractTime(task.end),
  };
}

export const useEditNonRecurringTaskForm = ({
  task,
  onSave,
}: {
  task: NonRecurringTask | null;
  onSave?: () => void;
}) => {
  const formReturn = useForm<NonRecurringTaskFormData>({
    ...(task && {
      values: makeFormFromTask(task),
    }),
  });

  const updateNonRecurringTaskMutation =
    trpc.task.updateNonRecurringTask.useMutation({
      onSuccess: () => {
        formReturn.reset();
        onSave && onSave();
      },
    });

  const saveForm = async (formData: NonRecurringTaskFormData) => {
    if (task) {
      await updateNonRecurringTaskMutation.mutateAsync({
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
    isLoading: updateNonRecurringTaskMutation.isLoading,
  };
};
