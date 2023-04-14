import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimRecurringTaskTemplate, shimTask } from '../shim';
import {
  FindTaskWhereManyInput,
  FindRecurringTaskTemplateWhereManyInput,
  FindTaskWhereUniqueInput,
} from '../types';
import { RecurringTaskTemplate, Task } from '@remind-me/shared/util-task';
import { recurringTaskArgs } from '../types/internal';

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
    where: {
      ownerId,
      startDate: {
        gte: start,
      },
      endDate: {
        lte: end,
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
      where,
    })
    .then(shimTask);
}
