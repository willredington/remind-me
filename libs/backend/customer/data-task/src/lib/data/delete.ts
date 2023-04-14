import { type DbClient } from '@remind-me/backend/customer/data-db';
import { RecurringTaskTemplate, Task } from '@remind-me/shared/util-task';
import { shimRecurringTaskTemplate, shimTask } from '../shim';
import { FindTaskWhereUniqueInput } from '../types';
import { recurringTaskArgs } from '../types/internal';

export function deleteRecurringTaskTemplate({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<RecurringTaskTemplate> {
  return client.recurringTaskTemplate
    .delete({
      ...recurringTaskArgs,
      where,
    })
    .then(shimRecurringTaskTemplate);
}

export function deleteTask({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<Task> {
  return client.task
    .delete({
      where,
    })
    .then(shimTask);
}
