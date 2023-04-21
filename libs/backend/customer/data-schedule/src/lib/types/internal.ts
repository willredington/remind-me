import { Prisma } from '@remind-me/backend/customer/data-db';

export const scheduleArgs = Prisma.validator<Prisma.ScheduleArgs>()({
  include: {
    tasks: {
      include: {
        location: true,
      },
    },
  },
});

export type ScheduleIn = Prisma.ScheduleGetPayload<typeof scheduleArgs>;
