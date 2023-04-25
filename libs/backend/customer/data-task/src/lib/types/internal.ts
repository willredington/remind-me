import { Prisma } from '@remind-me/backend/customer/data-db';

export const taskArgs = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    origin: true,
    destination: true,
  },
});

export type TaskIn = Prisma.TaskGetPayload<typeof taskArgs>;

export const taskTemplateArgs = Prisma.validator<Prisma.TaskTemplateArgs>()({
  include: {
    frequency: true,
    destination: true,
    tasks: {
      select: {
        id: true,
        startDate: true,
        endDate: true,
      },
    },
  },
});

export type TaskTemplateIn = Prisma.TaskTemplateGetPayload<
  typeof taskTemplateArgs
>;
