import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  shimRecurringTaskInstance,
  shimRecurringTaskTemplate,
  shimTask,
} from '../shim';
import { FindTaskWhereUniqueInput, UpdateTaskInput } from '../types';
import {
  RecurringTaskInstance,
  RecurringTaskTemplate,
  Task,
} from '@remind-me/shared/util-task';
import {
  recurringTaskInstanceArgs,
  recurringTaskTemplateArgs,
  taskArgs,
} from '../types/internal';

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
      ...recurringTaskTemplateArgs,
      where,
      data,
    })
    .then(shimRecurringTaskTemplate);
}

export function updateRecurringTaskInstance({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
  data: UpdateTaskInput;
}): Promise<RecurringTaskInstance> {
  return client.recurringTaskInstance
    .update({
      ...recurringTaskInstanceArgs,
      where,
      data,
    })
    .then(shimRecurringTaskInstance);
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
      ...taskArgs,
      where,
      data,
    })
    .then(shimTask);
}
