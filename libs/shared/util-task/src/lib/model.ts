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
  templateId: z.string().nullish(),
  scheduleId: z.string(),
});

export type Task = z.infer<typeof Task>;

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
  tasks: z.array(
    Task.pick({
      id: true,
      startDate: true,
      endDate: true,
    })
  ),
});

export type RecurringTaskTemplate = z.infer<typeof RecurringTaskTemplate>;

export const Schedule = z.object({
  id: z.string(),
  date: z.date(),
  ownerId: z.string(),
  tasks: z.array(Task),
});

export type Schedule = z.infer<typeof Schedule>;
