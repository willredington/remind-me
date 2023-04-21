import { type DbClient } from '@remind-me/backend/customer/data-db';
import { TaskTemplate, Task } from '@remind-me/shared/util-task';
import { shimTaskTemplate, shimTask } from '../shim';
import { FindTaskWhereUniqueInput } from '../types';
import { taskTemplateArgs, taskArgs } from '../types/internal';

export function deleteTaskTemplate({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<TaskTemplate> {
  return client.taskTemplate
    .delete({
      ...taskTemplateArgs,
      where,
    })
    .then(shimTaskTemplate);
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
      ...taskArgs,
      where,
    })
    .then(shimTask);
}
