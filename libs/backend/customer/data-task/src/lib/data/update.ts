import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimRecurringTaskTemplate, shimTask } from '../shim';
import { FindTaskWhereUniqueInput, UpdateTaskInput } from '../types';
import { RecurringTaskTemplate, Task } from '@remind-me/shared/util-task';
import { recurringTaskArgs } from '../types/internal';

export function updateRecurringTaskTemplate({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
  data: UpdateTaskInput;
}): Promise<RecurringTaskTemplate> {
  return client.recurringTaskTemplate
    .update({
      ...recurringTaskArgs,
      where,
      data,
    })
    .then(shimRecurringTaskTemplate);
}

export function updateTask({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
  data: UpdateTaskInput;
}): Promise<Task> {
  return client.task
    .update({
      where,
      data,
    })
    .then(shimTask);
}
