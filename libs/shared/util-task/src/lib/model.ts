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
  locationId: z.string(),
  location: Location,
});

export const Task = BaseTask.extend({
  startDate: z.date(),
  endDate: z.date(),
  templateId: z.string().nullish(),
});

export type Task = z.infer<typeof Task>;

export const TaskTemplate = BaseTask.extend({
  isAuto: z.boolean(),
  priority: z.nativeEnum(TaskPriority).nullish(),
  frequency: Frequency.nullish(),
  location: Location,
  tasks: z.array(
    Task.pick({
      id: true,
      startDate: true,
      endDate: true,
    })
  ),
});

export type TaskTemplate = z.infer<typeof TaskTemplate>;
