import {
  CreateLocationInput,
  FindLocationWhereUniqueInput,
  UpdateLocationInput,
} from '@remind-me/backend/customer/data-location';
import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { z } from 'zod';

export const locationRouter = router({
  createLocation: publicProcedure
    .input(
      CreateLocationInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.locationService.create({
        data: {
          ...input,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  findManyLocations: publicProcedure.query(({ ctx }) => {
    return ctx.services.locationService.findMany({
      where: {
        ownerId: ctx.auth.profileId,
      },
    });
  }),

  updateLocation: publicProcedure
    .input(
      z.object({
        where: FindLocationWhereUniqueInput,
        data: UpdateLocationInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.locationService.update(input);
    }),

  deleteLocation: publicProcedure
    .input(
      z.object({
        where: FindLocationWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.locationService.delete(input);
    }),
});
