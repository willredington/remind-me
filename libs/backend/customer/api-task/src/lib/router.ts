import {
  CreateTaskInput,
  CreateRecurringTaskTemplateInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
  FindRecurringTaskTemplateWhereManyInput,
} from '@remind-me/backend/customer/data-schedule';
import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { z } from 'zod';

export const taskRouter = router({
  createRecurringTaskTemplate: publicProcedure
    .input(
      CreateRecurringTaskTemplateInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.createRecurringTaskTemplate({
        data: {
          ...input,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  createTask: publicProcedure
    .input(
      CreateTaskInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.createTask({
        data: {
          ...input,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  findManyRecurringTaskTemplates: publicProcedure
    .input(
      FindRecurringTaskTemplateWhereManyInput.omit({
        ownerId: true,
      })
    )
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findManyRecurringTaskTemplates({
        where: {
          ownerId: ctx.auth.profileId,
          isAuto: input.isAuto,
        },
      });
    }),

  findUniqueTask: publicProcedure
    .input(FindTaskWhereUniqueInput)
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findUniqueTask({
        where: input,
      });
    }),

  findManyTasks: publicProcedure
    .input(
      FindTaskWhereManyInput.omit({
        ownerId: true,
      })
    )
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findManyTasks({
        where: {
          dateRange: input.dateRange,
          ownerId: ctx.auth.profileId,
        },
      });
    }),

  updateRecurringTaskTemplate: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
        data: UpdateTaskInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.updateRecurringTaskTemplate(input);
    }),

  updateTask: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
        data: UpdateTaskInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.updateTask(input);
    }),

  deleteRecurringTaskTemplate: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.deleteRecurringTaskTemplate(input);
    }),

  deleteTask: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.deleteTask(input);
    }),
});
