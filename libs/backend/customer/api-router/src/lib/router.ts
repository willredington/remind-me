import { locationRouter } from '@remind-me/backend/customer/api-location';
import { taskRouter } from '@remind-me/backend/customer/api-task';
import { suggestionRouter } from '@remind-me/backend/customer/api-suggest';
import { router } from '@remind-me/backend/customer/util-trpc';

export const appRouter = router({
  task: taskRouter,
  location: locationRouter,
  suggest: suggestionRouter,
});

export type AppRouter = typeof appRouter;
