import { DbTask, Prisma } from '@remind-me/backend/customer/data-db';

export type TaskIn = DbTask;

export const recurringTaskArgs =
  Prisma.validator<Prisma.RecurringTaskTemplateArgs>()({
    include: {
      frequency: true,
    },
  });

export type RecurringTaskTemplateIn = Prisma.RecurringTaskTemplateGetPayload<
  typeof recurringTaskArgs
>;
