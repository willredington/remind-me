import { Frequency } from '@remind-me/shared/util-frequency';
import { z } from 'zod';

export enum TaskType {
  Recurring = 'Recurring',
  NonRecurring = 'NonRecurring',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

const BaseTask = z.object({
  id: z.string(),
  type: z.nativeEnum(TaskType),
  name: z.string(),
  description: z.string().optional(),
  locationId: z.string(),
  start: z.date(),
  end: z.date(),
});

export const RecurringTask = BaseTask.extend({
  type: z.literal(TaskType.Recurring),
  frequency: Frequency,
});

export type RecurringTask = z.infer<typeof RecurringTask>;

export const NonRecurringTask = BaseTask.extend({
  type: z.literal(TaskType.NonRecurring),
});

export type NonRecurringTask = z.infer<typeof NonRecurringTask>;
