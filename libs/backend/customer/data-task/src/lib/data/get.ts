import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimRecurringTaskTemplate, shimTask } from '../shim';
import {
  FindTaskWhereManyInput,
  FindRecurringTaskTemplateWhereManyInput,
  FindTaskWhereUniqueInput,
  FindCompletedTaskWithTemplatesWhereManyInput,
} from '../types';
import { RecurringTaskTemplate, Task } from '@remind-me/shared/util-task';
import { recurringTaskArgs, taskArgs } from '../types/internal';

export async function findManyRecurringTaskTemplates({
  client,
  where,
}: {
  client: DbClient;
  where: FindRecurringTaskTemplateWhereManyInput;
}): Promise<RecurringTaskTemplate[]> {
  const tasks = await client.recurringTaskTemplate.findMany({
    ...recurringTaskArgs,
    where,
  });

  return tasks.map(shimRecurringTaskTemplate);
}

export async function findManyTasks({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereManyInput;
}): Promise<Task[]> {
  const { ownerId, dateRange } = where;
  const [start, end] = dateRange;

  const tasks = await client.task.findMany({
    ...taskArgs,
    where: {
      ownerId,
      startDate: {
        gte: start,
      },
      endDate: {
        lte: end,
      },
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  return tasks.map(shimTask);
}

export async function findManyCompletedTasksWithTemplates({
  client,
  where,
}: {
  client: DbClient;
  where: FindCompletedTaskWithTemplatesWhereManyInput;
}): Promise<Task[]> {
  const { ownerId } = where;
  const tasks = await client.task.findMany({
    ...taskArgs,
    where: {
      ownerId,
      lastCompletedAt: {
        not: null,
      },
      template: {
        isNot: null,
      },
    },
  });

  return tasks.map(shimTask);
}

export async function findUniqueTask({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<Task> {
  return await client.task
    .findUniqueOrThrow({
      ...taskArgs,
      where,
    })
    .then(shimTask);
}
