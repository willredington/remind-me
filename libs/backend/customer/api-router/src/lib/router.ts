import { constraintRouter } from '@remind-me/backend/customer/api-constraint';
import { locationRouter } from '@remind-me/backend/customer/api-location';
import { taskRouter } from '@remind-me/backend/customer/api-task';
import { router } from '@remind-me/backend/customer/util-trpc';

export const appRouter = router({
  task: taskRouter,
  location: locationRouter,
  constraint: constraintRouter,
});

export type AppRouter = typeof appRouter;
