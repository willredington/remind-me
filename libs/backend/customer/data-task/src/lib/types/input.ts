import { z } from 'zod';

const BaseCreateTaskInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  ownerId: z.string(),
  locationId: z.string(),
});

export const CreateRecurringTaskTemplateInput = BaseCreateTaskInput.extend({
  durationInMinutes: z.number(),
  frequencyUnit: z.string(), // FIXME
  frequencyValue: z.number(),
  frequencyDays: z.array(z.string()).optional(),
});

export type CreateRecurringTaskTemplateInput = z.infer<
  typeof CreateRecurringTaskTemplateInput
>;

export const CreateTaskInput = BaseCreateTaskInput.extend({
  startDate: z.date(),
  endDate: z.date(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInput>;

export const CreateRecurringTaskInstanceInput = CreateTaskInput.extend({
  templateId: z.string(),
  locationId: z.string().nullish(),
});

export type CreateRecurringTaskInstanceInput = z.infer<
  typeof CreateRecurringTaskInstanceInput
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

export const FindRecurringTaskTemplateWhereManyInput = z.object({
  ownerId: z.string(),
});

export type FindRecurringTaskTemplateWhereManyInput = z.infer<
  typeof FindRecurringTaskTemplateWhereManyInput
>;

export const FindTaskWhereManyInput = z.object({
  ownerId: z.string(),
  dateRange: z.tuple([z.date(), z.date()]),
});

export type FindTaskWhereManyInput = z.infer<typeof FindTaskWhereManyInput>;
