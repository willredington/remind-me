import { z } from 'zod';
import { Frequency } from '@remind-me/shared/util-frequency';
import { Location } from '@remind-me/shared/util-location';

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

const BaseTask = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
  location: Location,
});

export const Task = BaseTask.extend({
  startDate: z.date(),
  endDate: z.date(),
  templateId: z.string().nullish(),
  scheduleId: z.string(),
});

export type Task = z.infer<typeof Task>;

export const TaskTemplate = BaseTask.extend({
  isAuto: z.boolean(),
  priority: z.nativeEnum(TaskPriority).nullish(),
  frequency: Frequency.nullish(),
  tasks: z.array(
    Task.pick({
      id: true,
      startDate: true,
      endDate: true,
    })
  ),
});

export type TaskTemplate = z.infer<typeof TaskTemplate>;

export const Trip = z.object({
  id: z.string(),
  ownerId: z.string(),
  origin: Location,
  destination: Location,
  scheduleId: z.string(),
});

export type Trip = z.infer<typeof Trip>;

export const Schedule = z.object({
  id: z.string(),
  date: z.date(),
  ownerId: z.string(),
  tasks: z.array(Task),
  trips: z.array(Trip),
});

export type Schedule = z.infer<typeof Schedule>;
