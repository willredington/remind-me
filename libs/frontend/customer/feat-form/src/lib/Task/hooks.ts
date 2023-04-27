import { setTimeForDateFromString } from '@remind-me/frontend/customer/util-date';
import { useAppState } from '@remind-me/frontend/customer/util-store';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateRange } from '@remind-me/shared/util-date';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { TaskFormData, UseTaskFormReturn } from './types';
import { extractTime } from './utils';

function makeDefaultTimeSlot(dateTime: DateTime): DateRange {
  const start = dateTime.set({
    hour: 9,
    minute: 0,
  });

  return [
    start.toJSDate(),
    start
      .plus({
        hours: 1,
      })
      .toJSDate(),
  ];
}

export const useCreateTaskForm = ({
  timeSlot,
  dateTime,
  onSave,
}: {
  timeSlot?: DateRange;
  dateTime: DateTime;
  onSave?: () => void;
}): UseTaskFormReturn => {
  const trpcUtils = trpc.useContext();

  const [start, end]: DateRange = useMemo(() => {
    return timeSlot ?? makeDefaultTimeSlot(dateTime);
  }, [timeSlot, dateTime]);

  const formReturn = useForm<TaskFormData>({
    defaultValues: {
      startTime: extractTime(start),
      endTime: extractTime(end),
    },
  });

  useEffect(() => {
    if (timeSlot) {
      const [start, end] = timeSlot;
      formReturn.setValue('startTime', extractTime(start));
      formReturn.setValue('endTime', extractTime(end));
    }
  }, [timeSlot, formReturn]);

  const onSuccess = () => {
    trpcUtils.task.findUniqueOrCreateSchedule.invalidate({
      date: dateTime.startOf('day').toJSDate(),
    });

    formReturn.reset();
    onSave && onSave();
  };

  const createTaskTemplateMutation = trpc.task.createTaskTemplate.useMutation({
    onSuccess,
  });

  const createTaskMutation = trpc.task.createTask.useMutation({
    onSuccess,
  });

  const saveForm = async (formData: TaskFormData) => {
    const startDateTime = setTimeForDateFromString(formData.startTime, start);
    const endDateTime = setTimeForDateFromString(formData.endTime, end);

    let templateId: string | null = null;

    if (formData.isRecurring) {
      const taskTemplate = await createTaskTemplateMutation.mutateAsync({
        isAuto: false,
        locationId: formData.locationId,
        name: formData.name,
        frequency: {
          unit: formData.frequencyUnit,
          value: formData.frequencyValue,
          days: formData.frequencyDays,
        },
      });

      templateId = taskTemplate.id;
    }

    await createTaskMutation.mutateAsync({
      name: formData.name,
      locationId: formData.locationId,
      startDate: startDateTime,
      endDate: endDateTime,
      templateId,
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
    isRecurring: false,
    name: task.name,
    locationId: task.location.id,
    startTime: extractTime(task.startDate),
    endTime: extractTime(task.endDate),
  };
}

export const useEditTaskForm = ({
  dateTime,
  onSave,
}: {
  dateTime: DateTime;
  onSave?: () => void;
}): UseTaskFormReturn => {
  const trpcUtils = trpc.useContext();

  const task = useAppState((state) => state.selectedTask);

  const formReturn = useForm<TaskFormData>({
    ...(task && {
      values: makeFormFromTask(task),
    }),
  });

  const updateTaskMutation = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      trpcUtils.task.findUniqueOrCreateSchedule.invalidate({
        date: dateTime.startOf('day').toJSDate(),
      });

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
