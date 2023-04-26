export { prismaClient as prisma } from './db';
export {
  Prisma,
  PrismaClient as DbClient,
  Profile as DbProfile,
  Location as DbLocation,
  Frequency as DbFrequency,
  TaskTemplate as DbTaskTemplate,
  Task as DbTask,
  Trip as DbTrip,
  Schedule as DbSchedule,
  Prisma as DbTypes,
} from '@prisma/client';
