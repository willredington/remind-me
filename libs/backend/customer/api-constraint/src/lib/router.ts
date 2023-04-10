import {
  CreateConstraintInput,
  FindConstraintWhereUniqueInput,
} from '@remind-me/backend/customer/data-constraint';
import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { z } from 'zod';

export const constraintRouter = router({
  createGlobalConstraint: publicProcedure
    .input(
      CreateConstraintInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.constraintService.createGlobalConstraint({
        data: {
          ...input,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  findManyGlobalConstraints: publicProcedure.query(({ ctx }) => {
    return ctx.services.constraintService.findManyGlobalConstraints({
      where: {
        ownerId: ctx.auth.profileId,
      },
    });
  }),

  deleteGlobalConstraint: publicProcedure
    .input(
      z.object({
        where: FindConstraintWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.constraintService.deleteGlobalConstraint(input);
    }),
});
