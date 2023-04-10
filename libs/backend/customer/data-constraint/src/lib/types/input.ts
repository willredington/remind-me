import { ConstraintType } from '@remind-me/shared/util-constraint';
import { z } from 'zod';

const TimeRangeConstraintDetails = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

export const CreateConstraintInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  ownerId: z.string(),
  details: TimeRangeConstraintDetails.optional(),
  type: z.nativeEnum(ConstraintType),
});

export type CreateConstraintInput = z.infer<typeof CreateConstraintInput>;

export const FindConstraintWhereUniqueInput = z.object({
  id: z.string(),
});

export type FindConstraintWhereUniqueInput = z.infer<
  typeof FindConstraintWhereUniqueInput
>;

export type FindConstraintWhereManyInput = {
  ownerId: string;
};
