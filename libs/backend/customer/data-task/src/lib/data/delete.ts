import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimNonRecurringTask, shimRecurringTask } from '../shim';
import { FindTaskWhereUniqueInput } from '../types';
import { RecurringTask, NonRecurringTask } from '@remind-me/shared/util-task';

export function deleteRecurringTask({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<RecurringTask> {
  return client.recurringTask
    .delete({
      where,
    })
    .then(shimRecurringTask);
}

export function deleteNonRecurringTask({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<NonRecurringTask> {
  return client.nonRecurringTask
    .delete({
      where,
    })
    .then(shimNonRecurringTask);
}
