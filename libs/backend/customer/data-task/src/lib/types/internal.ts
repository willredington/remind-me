import {
  DbNonRecurringTask,
  Prisma,
} from '@remind-me/backend/customer/data-db';

export type NonRecurringTaskIn = DbNonRecurringTask;

export const recurringTaskArgs = Prisma.validator<Prisma.RecurringTaskArgs>()({
  include: {
    frequency: true,
  },
});

export type RecurringTaskIn = Prisma.RecurringTaskGetPayload<
  typeof recurringTaskArgs
>;
