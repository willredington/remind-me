import { z } from 'zod';

const BaseCreateTaskInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  ownerId: z.string(),
  locationId: z.string(),
  start: z.date(),
  end: z.date(),
});

export const CreateRecurringTaskInput = BaseCreateTaskInput.extend({
  frequencyUnit: z.string(), // FIXME
  frequencyValue: z.number(),
  frequencyDays: z.array(z.string()).optional(),
});

export type CreateRecurringTaskInput = z.infer<typeof CreateRecurringTaskInput>;

export const CreateNonRecurringTaskInput = BaseCreateTaskInput;

export type CreateNonRecurringTaskInput = z.infer<
  typeof CreateNonRecurringTaskInput
>;

export const UpdateTaskInput = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .partial();

export type UpdateTaskInput = z.infer<typeof UpdateTaskInput>;

export const FindTaskWhereUniqueInput = z.object({
  id: z.string(),
});

export type FindTaskWhereUniqueInput = z.infer<typeof FindTaskWhereUniqueInput>;

export const FindTaskWhereManyInput = z.object({
  ownerId: z.string(),
  dateRange: z.tuple([z.date(), z.date()]),
});

export type FindTaskWhereManyInput = z.infer<typeof FindTaskWhereManyInput>;
