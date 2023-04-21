import { z } from 'zod';
import { Task } from '@remind-me/shared/util-task';

export const Schedule = z.object({
  id: z.string(),
  date: z.date(),
  ownerId: z.string(),
  tasks: z.array(Task),
});

export type Schedule = z.infer<typeof Schedule>;
