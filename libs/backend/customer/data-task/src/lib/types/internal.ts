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

export const recurringTaskTemplateArgs =
  Prisma.validator<Prisma.RecurringTaskTemplateArgs>()({
    include: {
      frequency: true,
      instances: {
        include: {
          location: {
            include: {
              coordinatePoint: true,
            },
          },
        },
      },
      location: {
        include: {
          coordinatePoint: true,
        },
      },
    },
  });

export type RecurringTaskTemplateIn = Prisma.RecurringTaskTemplateGetPayload<
  typeof recurringTaskTemplateArgs
>;

export const recurringTaskInstanceArgs =
  Prisma.validator<Prisma.RecurringTaskInstanceArgs>()({
    include: {
      location: {
        include: {
          coordinatePoint: true,
        },
      },
    },
  });

export type RecurringTaskInstanceIn = Prisma.RecurringTaskInstanceGetPayload<
  typeof recurringTaskInstanceArgs
>;
