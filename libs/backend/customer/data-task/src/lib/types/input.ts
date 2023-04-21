import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import { TaskPriority } from '@remind-me/shared/util-task';
import { z } from 'zod';

const BaseCreateTaskInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  ownerId: z.string(),
  locationId: z.string(),
});

export const CreateTaskTemplateInput = BaseCreateTaskInput.extend({
  isAuto: z.boolean(),
  priority: z.nativeEnum(TaskPriority).optional(),
  frequency: z
    .object({
      unit: z.nativeEnum(FrequencyUnit),
      value: z.number(),
      days: z.array(z.string()).optional(),
    })
    .optional(),
});

export type CreateTaskTemplateInput = z.infer<typeof CreateTaskTemplateInput>;

export const CreateTaskInput = BaseCreateTaskInput.extend({
  startDate: z.date(),
  endDate: z.date(),
  scheduleId: z.string(),
  templateId: z.string().nullish(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInput>;

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

export const FindTaskTemplateWhereManyInput = z.object({
  ownerId: z.string(),
  isAuto: z.boolean(),
});

export type FindTaskTemplateWhereManyInput = z.infer<
  typeof FindTaskTemplateWhereManyInput
>;

export const FindTaskWhereManyInput = z.object({
  ownerId: z.string(),
  dateRange: z.tuple([z.date(), z.date()]),
});

export type FindTaskWhereManyInput = z.infer<typeof FindTaskWhereManyInput>;

export const FindScheduleWhereUnique = z.object({
  ownerId: z.string(),
  dateRange: z.tuple([z.date(), z.date()]),
});

export type FindScheduleWhereUnique = z.infer<typeof FindScheduleWhereUnique>;
