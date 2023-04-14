import {
  CreateTaskInput,
  CreateRecurringTaskTemplateInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '@remind-me/backend/customer/data-task';
import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { z } from 'zod';

export const taskRouter = router({
  createRecurringTasks: publicProcedure
    .input(
      CreateRecurringTaskTemplateInput.omit({
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
      CreateTaskInput.omit({
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

  findManyRecurringTasks: publicProcedure
    .input(
      FindTaskWhereManyInput.omit({
        ownerId: true,
      })
    )
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findManyRecurringTasks({
        where: {
          dateRange: input.dateRange,
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

  findManyNonRecurringTasks: publicProcedure
    .input(
      FindTaskWhereManyInput.omit({
        ownerId: true,
      })
    )
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findManyNonRecurringTasks({
        where: {
          dateRange: input.dateRange,
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
