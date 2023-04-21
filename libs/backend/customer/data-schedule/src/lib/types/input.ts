import { z } from 'zod';

export const CreateScheduleInput = z.object({
  date: z.date(),
  ownerId: z.string(),
  locationId: z.string(),
});

export type CreateScheduleInput = z.infer<typeof CreateScheduleInput>;

export const FindScheduleWhereUnique = z.object({
  ownerId: z.string(),
  date: z.date(),
});

export type FindScheduleWhereUnique = z.infer<typeof FindScheduleWhereUnique>;
