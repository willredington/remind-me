import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { DateTime } from 'luxon';
import { z } from 'zod';

export const suggestionRouter = router({
  getSuggestions: publicProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.services.suggestService.getSuggestions({
        ownerId: ctx.auth.profileId,
        dateTime: DateTime.fromJSDate(input.date),
      });
    }),
});
