import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import { TaskPriority } from '@remind-me/shared/util-task';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const BaseTaskFormData = z.object({
  name: z.string(),
  locationId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const TaskTemplateFormData = BaseTaskFormData.extend({
  frequencyUnit: z.nativeEnum(FrequencyUnit),
  frequencyValue: z.number(),
  frequencyDays: z.array(z.string()).optional(),
  priority: z.nativeEnum(TaskPriority),
});

export type TaskTemplateFormData = z.infer<typeof TaskTemplateFormData>;

const TaskFormData = BaseTaskFormData;

export type TaskFormData = z.infer<typeof TaskFormData>;

export type UseTaskFormReturn = {
  isLoading: boolean;
  onSubmit: () => void;
  formReturn: UseFormReturn<TaskFormData>;
};
