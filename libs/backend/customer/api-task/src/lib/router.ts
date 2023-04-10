import {
  CreateNonRecurringTaskInput,
  CreateRecurringTaskInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '@remind-me/backend/customer/data-task';
import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { z } from 'zod';

export const taskRouter = router({
  createRecurringTasks: publicProcedure
    .input(
      CreateRecurringTaskInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.createRecurringTask({
        data: {
          ...input,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  createNonRecurringTask: publicProcedure
    .input(
      CreateNonRecurringTaskInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.createNonRecurringTask({
        data: {
          ...input,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  findManyRecurringTasks: publicProcedure.query(({ ctx }) => {
    return ctx.services.taskService.findManyRecurringTasks({
      where: {
        ownerId: ctx.auth.profileId,
      },
    });
  }),

  findUniqueNonRecurringTask: publicProcedure
    .input(FindTaskWhereUniqueInput)
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findUniqueNonRecurringTask({
        where: input,
      });
    }),

  findManyNonRecurringTasks: publicProcedure.query(({ ctx }) => {
    return ctx.services.taskService.findManyNonRecurringTasks({
      where: {
        ownerId: ctx.auth.profileId,
      },
    });
  }),

  updateRecurringTask: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
        data: UpdateTaskInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.updateRecurringTask(input);
    }),

  updateNonRecurringTask: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
        data: UpdateTaskInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.updateNonRecurringTask(input);
    }),

  deleteRecurringTask: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.deleteRecurringTask(input);
    }),

  deleteNonRecurringTask: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.deleteNonRecurringTask(input);
    }),
});
