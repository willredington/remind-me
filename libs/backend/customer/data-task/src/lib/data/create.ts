import { type DbClient } from '@remind-me/backend/customer/data-db';
import { TaskTemplate, Task, Schedule } from '@remind-me/shared/util-task';
import { shimTaskTemplate, shimTask, shimSchedule } from '../shim';
import {
  CreateTaskTemplateInput,
  CreateTaskInput,
  CreateScheduleInput,
} from '../types';
import { taskTemplateArgs, taskArgs, scheduleArgs } from '../types/internal';

export function createTaskTemplate({
  client,
  data,
}: {
  client: DbClient;
  data: CreateTaskTemplateInput;
}): Promise<TaskTemplate> {
  const {
    name,
    description,
    priority,
    ownerId,
    locationId,
    frequency,
    isAuto,
  } = data;

  return client.taskTemplate
    .create({
      ...taskTemplateArgs,
      data: {
        name,
        description,
        priority,
        isAuto,
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
        ...(frequency != null && {
          frequency: {
            create: {
              unit: frequency.unit,
              value: frequency.value,
              days: frequency.days ?? [],
              owner: {
                connect: {
                  id: ownerId,
                },
              },
            },
          },
        }),
      },
    })
    .then(shimTaskTemplate);
}

export function createSchedule({
  client,
  data,
}: {
  client: DbClient;
  data: CreateScheduleInput;
}): Promise<Schedule> {
  return client.schedule
    .create({
      ...scheduleArgs,
      data,
    })
    .then(shimSchedule);
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
