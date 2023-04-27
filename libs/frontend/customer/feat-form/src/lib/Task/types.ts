import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const BaseTaskFormData = z.object({
  isRecurring: z.literal(false),
  name: z.string(),
  locationId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const TaskTemplateFormData = BaseTaskFormData.extend({
  isRecurring: z.literal(true),
  frequencyUnit: z.nativeEnum(FrequencyUnit),
  frequencyValue: z.number(),
  frequencyDays: z.array(z.string()).optional(),
});

export type TaskTemplateFormData = z.infer<typeof TaskTemplateFormData>;

export const TaskFormData = z.union([BaseTaskFormData, TaskTemplateFormData]);

export type TaskFormData = z.infer<typeof TaskFormData>;

export type UseTaskFormReturn = {
  isLoading: boolean;
  onSubmit: () => void;
  formReturn: UseFormReturn<TaskFormData>;
};
