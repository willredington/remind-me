import { Prisma } from '@remind-me/backend/customer/data-db';

export const locationArgs = Prisma.validator<Prisma.LocationArgs>()({
  include: {
    coordinatePoint: true,
  },
});

export type LocationIn = Prisma.LocationGetPayload<typeof locationArgs>;
