import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimRecurringTaskTemplate, shimTask } from '../shim';
import { CreateTaskInput, CreateRecurringTaskTemplateInput } from '../types';
import { RecurringTaskTemplate, Task } from '@remind-me/shared/util-task';
import { recurringTaskArgs } from '../types/internal';

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
  } = data;

  return client.recurringTaskTemplate
    .create({
      ...recurringTaskArgs,
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
      data,
    })
    .then(shimTask);
}
