import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimTaskTemplate, shimTask } from '../shim';
import {
  FindTaskWhereManyInput,
  FindTaskTemplateWhereManyInput,
  FindTaskWhereUniqueInput,
} from '../types';
import { TaskTemplate, Task } from '@remind-me/shared/util-task';
import { taskTemplateArgs, taskArgs } from '../types/internal';

export async function findManyTaskTemplates({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskTemplateWhereManyInput;
}): Promise<TaskTemplate[]> {
  const tasks = await client.taskTemplate.findMany({
    ...taskTemplateArgs,
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return tasks.map(shimTaskTemplate);
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
