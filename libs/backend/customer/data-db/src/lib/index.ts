export { prismaClient as prisma } from './db';
export {
  Prisma,
  PrismaClient as DbClient,
  Profile as DbProfile,
  Location as DbLocation,
  Frequency as DbFrequency,
  GlobalConstraint as DbGlobalConstraint,
  RecurringTask as DbRecurringTask,
  NonRecurringTask as DbNonRecurringTask,
  Prisma as DbTypes,
} from '@prisma/client';
