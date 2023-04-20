import { Prisma } from '@remind-me/backend/customer/data-db';

export const taskArgs = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    location: true,
  },
});

export type TaskIn = Prisma.TaskGetPayload<typeof taskArgs>;

export const recurringTaskTemplateArgs =
  Prisma.validator<Prisma.RecurringTaskTemplateArgs>()({
    include: {
      frequency: true,
      location: true,
      tasks: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  });

export type RecurringTaskTemplateIn = Prisma.RecurringTaskTemplateGetPayload<
  typeof recurringTaskTemplateArgs
>;
