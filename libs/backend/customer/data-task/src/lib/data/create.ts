import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimNonRecurringTask, shimRecurringTask } from '../shim';
import {
  CreateNonRecurringTaskInput,
  CreateRecurringTaskInput,
} from '../types';
import { RecurringTask, NonRecurringTask } from '@remind-me/shared/util-task';

export function createRecurringTask({
  client,
  data,
}: {
  client: DbClient;
  data: CreateRecurringTaskInput;
}): Promise<RecurringTask> {
  const {
    name,
    start,
    end,
    ownerId,
    locationId,
    frequencyUnit,
    frequencyValue,
    frequencyDays,
  } = data;

  return client.recurringTask
    .create({
      data: {
        name,
        start,
        end,
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
    .then(shimRecurringTask);
}

export function createNonRecurringTask({
  client,
  data,
}: {
  client: DbClient;
  data: CreateNonRecurringTaskInput;
}): Promise<NonRecurringTask> {
  return client.nonRecurringTask
    .create({
      data,
    })
    .then(shimNonRecurringTask);
}
