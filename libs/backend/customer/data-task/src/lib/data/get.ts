import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimNonRecurringTask, shimRecurringTask } from '../shim';
import { FindTaskWhereManyInput, FindTaskWhereUniqueInput } from '../types';
import { RecurringTask, NonRecurringTask } from '@remind-me/shared/util-task';

export async function findManyRecurringTasks({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereManyInput;
}): Promise<RecurringTask[]> {
  const tasks = await client.recurringTask.findMany({
    where,
  });

  return tasks.map(shimRecurringTask);
}

export async function findManyNonRecurringTasks({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereManyInput;
}): Promise<NonRecurringTask[]> {
  const tasks = await client.nonRecurringTask.findMany({
    where,
  });

  return tasks.map(shimNonRecurringTask);
}

export async function findUniqueNonRecurringTask({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<NonRecurringTask> {
  return await client.nonRecurringTask
    .findUniqueOrThrow({
      where,
    })
    .then(shimNonRecurringTask);
}
