import { Prisma } from '@remind-me/backend/customer/data-db';

export const tripArgs = Prisma.validator<Prisma.TripArgs>()({
  include: {
    origin: true,
    destination: true,
  },
});

export type TripIn = Prisma.TripGetPayload<typeof tripArgs>;

export const scheduleArgs = Prisma.validator<Prisma.ScheduleArgs>()({
  include: {
    tasks: {
      include: {
        location: true,
      },
    },
    trips: {
      include: {
        origin: true,
        destination: true,
      },
    },
  },
});

export type ScheduleIn = Prisma.ScheduleGetPayload<typeof scheduleArgs>;

export const taskArgs = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    location: true,
  },
});

export type TaskIn = Prisma.TaskGetPayload<typeof taskArgs>;

export const taskTemplateArgs = Prisma.validator<Prisma.TaskTemplateArgs>()({
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

export type TaskTemplateIn = Prisma.TaskTemplateGetPayload<
  typeof taskTemplateArgs
>;
