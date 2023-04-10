import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import { TaskPriority } from '@remind-me/shared/util-task';
import { z } from 'zod';

const BaseTaskFormData = z.object({
  name: z.string(),
  locationId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const RecurringTaskFormData = BaseTaskFormData.extend({
  frequencyUnit: z.nativeEnum(FrequencyUnit),
  frequencyValue: z.number(),
  frequencyDays: z.array(z.string()).optional(),
  priority: z.nativeEnum(TaskPriority),
});

export type RecurringTaskFormData = z.infer<typeof RecurringTaskFormData>;

const NonRecurringTaskFormData = BaseTaskFormData;

export type NonRecurringTaskFormData = z.infer<typeof NonRecurringTaskFormData>;
