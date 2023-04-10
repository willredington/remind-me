import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimNonRecurringTask, shimRecurringTask } from '../shim';
import { FindTaskWhereUniqueInput, UpdateTaskInput } from '../types';
import { RecurringTask, NonRecurringTask } from '@remind-me/shared/util-task';

export function updateRecurringTask({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
  data: UpdateTaskInput;
}): Promise<RecurringTask> {
  return client.recurringTask
    .update({
      where,
      data,
    })
    .then(shimRecurringTask);
}

export function updateNonRecurringTask({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
  data: UpdateTaskInput;
}): Promise<NonRecurringTask> {
  return client.nonRecurringTask
    .update({
      where,
      data,
    })
    .then(shimNonRecurringTask);
}
