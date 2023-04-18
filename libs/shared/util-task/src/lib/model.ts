import { z } from 'zod';
import { Frequency } from '@remind-me/shared/util-frequency';
import { Location } from '@remind-me/shared/util-location';

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export const Task = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: Location,
});

export type Task = z.infer<typeof Task>;

export const RecurringTaskInstance = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string().nullish(),
  isAuto: z.boolean(),
  ownerId: z.string(),
  templateId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: Location,
});

export type RecurringTaskInstance = z.infer<typeof RecurringTaskInstance>;

export const RecurringTaskTemplate = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string().nullish(),
  isAuto: z.boolean(),
  priority: z.nativeEnum(TaskPriority),
  ownerId: z.string(),
  templateId: z.string().nullish(),
  frequency: Frequency,
  location: Location,
  durationInMinutes: z.number(),
  instances: z.array(RecurringTaskInstance),
});

export type RecurringTaskTemplate = z.infer<typeof RecurringTaskTemplate>;
