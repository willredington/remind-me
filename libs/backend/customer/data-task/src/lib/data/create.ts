import { type DbClient } from '@remind-me/backend/customer/data-db';
import { RecurringTaskTemplate, Task } from '@remind-me/shared/util-task';
import { shimRecurringTaskTemplate, shimTask } from '../shim';
import { CreateRecurringTaskTemplateInput, CreateTaskInput } from '../types';
import { recurringTaskTemplateArgs, taskArgs } from '../types/internal';

export function createRecurringTaskTemplate({
  client,
  data,
}: {
  client: DbClient;
  data: CreateRecurringTaskTemplateInput;
}): Promise<RecurringTaskTemplate> {
  const {
    name,
    ownerId,
    locationId,
    frequencyUnit,
    frequencyValue,
    frequencyDays,
    durationInMinutes,
  } = data;

  return client.recurringTaskTemplate
    .create({
      ...recurringTaskTemplateArgs,
      data: {
        name,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        location: {
          connect: {
            id: locationId,
          },
        },
        durationInMinutes,
        frequency: {
          create: {
            unit: frequencyUnit,
            value: frequencyValue,
            days: frequencyDays ?? [],
            owner: {
              connect: {
                id: ownerId,
              },
            },
          },
        },
      },
    })
    .then(shimRecurringTaskTemplate);
}

export function createTask({
  client,
  data,
}: {
  client: DbClient;
  data: CreateTaskInput;
}): Promise<Task> {
  return client.task
    .create({
      ...taskArgs,
      data,
    })
    .then(shimTask);
}
