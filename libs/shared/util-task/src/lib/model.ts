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
  lastCompletedAt: z.date().nullish(),
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
  templateId: z.string().nullish(),
  startDate: z.date(),
  endDate: z.date(),
  location: Location,
});

export type Task = z.infer<typeof Task>;

export const UnsavedTask = Task.omit({
  id: true,
});

export type UnsavedTask = z.infer<typeof UnsavedTask>;

export const RecurringTaskTemplate = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string().nullish(),
  priority: z.nativeEnum(TaskPriority),
  ownerId: z.string(),
  templateId: z.string().nullish(),
  frequency: Frequency,
  location: Location,
  durationInMinutes: z.number(),
});

export type RecurringTaskTemplate = z.infer<typeof RecurringTaskTemplate>;
