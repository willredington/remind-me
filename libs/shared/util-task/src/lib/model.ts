import { z } from 'zod';
import { Frequency } from '@remind-me/shared/util-frequency';

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export const Task = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastCompletedAt: z.date().optional(),
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
  locationId: z.string(),
  templateId: z.string().optional(),
});

export type Task = z.infer<typeof Task>;

export const RecurringTaskTemplate = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string().nullish(),
  priority: z.nativeEnum(TaskPriority),
  ownerId: z.string(),
  locationId: z.string(),
  templateId: z.string().optional(),
  frequency: Frequency,
});

export type RecurringTaskTemplate = z.infer<typeof RecurringTaskTemplate>;
