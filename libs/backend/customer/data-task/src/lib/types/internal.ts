import { Prisma } from '@remind-me/backend/customer/data-db';

export const taskArgs = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    location: {
      include: {
        coordinatePoint: true,
      },
    },
  },
});

export type TaskIn = Prisma.TaskGetPayload<typeof taskArgs>;

export const recurringTaskArgs =
  Prisma.validator<Prisma.RecurringTaskTemplateArgs>()({
    include: {
      frequency: true,
      location: {
        include: {
          coordinatePoint: true,
        },
      },
    },
  });

export type RecurringTaskTemplateIn = Prisma.RecurringTaskTemplateGetPayload<
  typeof recurringTaskArgs
>;
