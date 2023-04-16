import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  shimRecurringTaskInstance,
  shimRecurringTaskTemplate,
  shimTask,
} from '../shim';
import {
  CreateTaskInput,
  CreateRecurringTaskTemplateInput,
  CreateRecurringTaskInstanceInput,
} from '../types';
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

export async function createRecurringTaskInstanceFromTemplate({
  client,
  data,
}: {
  client: DbClient;
  data: CreateRecurringTaskInstanceInput;
}): Promise<RecurringTaskInstance> {
  const { templateId, ...rest } = data;

  let locationId = data.locationId;

  if (!locationId) {
    const template = await client.recurringTaskTemplate.findUniqueOrThrow({
      where: {
        id: templateId,
      },
      select: {
        locationId: true,
      },
    });

    locationId = template.locationId;
  }

  return client.recurringTaskInstance
    .create({
      ...recurringTaskInstanceArgs,
      data: {
        ...rest,
        locationId,
        templateId,
      },
    })
    .then(shimRecurringTaskInstance);
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
