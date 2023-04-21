import { type DbClient } from '@remind-me/backend/customer/data-db';
import { TaskTemplate, Task } from '@remind-me/shared/util-task';
import { shimTaskTemplate, shimTask } from '../shim';
import { FindTaskWhereUniqueInput, UpdateTaskInput } from '../types';
import { taskTemplateArgs, taskArgs } from '../types/internal';

export function updateTaskTemplate({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
  data: UpdateTaskInput;
}): Promise<TaskTemplate> {
  return client.taskTemplate
    .update({
      ...taskTemplateArgs,
      where,
      data,
    })
    .then(shimTaskTemplate);
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
