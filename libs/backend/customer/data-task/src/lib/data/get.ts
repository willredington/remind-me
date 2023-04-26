import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimTaskTemplate, shimTask, shimSchedule } from '../shim';
import {
  FindTaskWhereManyInput,
  FindTaskTemplateWhereManyInput,
  FindTaskWhereUniqueInput,
  FindScheduleWhereUnique,
} from '../types';
import { TaskTemplate, Task, Schedule } from '@remind-me/shared/util-task';
import { taskTemplateArgs, taskArgs, scheduleArgs } from '../types/internal';

export async function findUniqueScheduleOrNull({
  client,
  where,
}: {
  client: DbClient;
  where: FindScheduleWhereUnique;
}) {
  const { ownerId, date } = where;
  const schedule = await client.schedule.findUnique({
    ...scheduleArgs,
    where: {
      ownerId_date: {
        ownerId,
        date,
      },
    },
  });

  return schedule != null ? shimSchedule(schedule) : null;
}

export async function findManyTaskTemplates({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskTemplateWhereManyInput;
}): Promise<TaskTemplate[]> {
  const tasks = await client.taskTemplate.findMany({
    ...taskTemplateArgs,
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return tasks.map(shimTaskTemplate);
}

export async function findManyTasks({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereManyInput;
}): Promise<Task[]> {
  const { ownerId, dateRange } = where;
  const [start, end] = dateRange;

  const tasks = await client.task.findMany({
    ...taskArgs,
    where: {
      ownerId,
      startDate: {
        gte: start,
      },
      endDate: {
        lte: end,
      },
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  return tasks.map(shimTask);
}

export async function findUniqueTask({
  client,
  where,
}: {
  client: DbClient;
  where: FindTaskWhereUniqueInput;
}): Promise<Task> {
  return await client.task
    .findUniqueOrThrow({
      ...taskArgs,
      where,
    })
    .then(shimTask);
}
