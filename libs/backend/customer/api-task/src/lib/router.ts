import {
  CreateTaskInput,
  CreateTaskTemplateInput,
  FindTaskTemplateWhereManyInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '@remind-me/backend/customer/data-task';
import { publicProcedure, router } from '@remind-me/backend/customer/util-trpc';
import { z } from 'zod';

export const taskRouter = router({
  createTaskTemplate: publicProcedure
    .input(
      CreateTaskTemplateInput.omit({
        ownerId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.createTaskTemplate({
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

  findManyTaskTemplates: publicProcedure
    .input(
      FindTaskTemplateWhereManyInput.omit({
        ownerId: true,
      })
    )
    .query(({ input, ctx }) => {
      return ctx.services.taskService.findManyTaskTemplates({
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

  updateTaskTemplate: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
        data: UpdateTaskInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.updateTaskTemplate(input);
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

  deleteTaskTemplate: publicProcedure
    .input(
      z.object({
        where: FindTaskWhereUniqueInput,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.services.taskService.deleteTaskTemplate(input);
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
