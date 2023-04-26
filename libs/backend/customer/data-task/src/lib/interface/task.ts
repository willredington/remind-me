import { type DbClient } from '@remind-me/backend/customer/data-db';
import { DateTime } from 'luxon';
import {
  createSchedule,
  createTask,
  createTaskTemplate,
  deleteTask,
  deleteTaskTemplate,
  findManyTasks,
  findManyTaskTemplates,
  findUniqueScheduleOrNull,
  findUniqueTask,
  updateTask,
  updateTaskTemplate,
} from '../data';
import {
  CreateTaskSansScheduleInput,
  CreateTaskTemplateInput,
  FindScheduleWhereUnique,
  FindTaskTemplateWhereManyInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '../types';

export class TaskService {
  constructor(private readonly client: DbClient) {}

  async findUniqueOrCreateSchedule({
    where,
  }: {
    where: FindScheduleWhereUnique;
  }) {
    const { ownerId, date } = where;
    const schedule = await findUniqueScheduleOrNull({
      client: this.client,
      where,
    });

    if (schedule) {
      return schedule;
    }

    return await createSchedule({
      client: this.client,
      data: {
        ownerId,
        date,
      },
    });
  }

  findManyTaskTemplates({ where }: { where: FindTaskTemplateWhereManyInput }) {
    return findManyTaskTemplates({
      client: this.client,
      where,
    });
  }

  findUniqueTask({ where }: { where: FindTaskWhereUniqueInput }) {
    return findUniqueTask({
      client: this.client,
      where,
    });
  }

  findManyTasks({ where }: { where: FindTaskWhereManyInput }) {
    return findManyTasks({
      client: this.client,
      where,
    });
  }

  createTaskTemplate({ data }: { data: CreateTaskTemplateInput }) {
    return createTaskTemplate({
      client: this.client,
      data,
    });
  }

  async createTask({ data }: { data: CreateTaskSansScheduleInput }) {
    const date = DateTime.fromJSDate(data.startDate).startOf('day').toJSDate();

    const schedule = await this.findUniqueOrCreateSchedule({
      where: {
        date,
        ownerId: data.ownerId,
      },
    });

    return createTask({
      client: this.client,
      data: {
        ...data,
        scheduleId: schedule.id,
      },
    });
  }

  updateTaskTemplate({
    where,
    data,
  }: {
    where: FindTaskWhereUniqueInput;
    data: UpdateTaskInput;
  }) {
    return updateTaskTemplate({
      client: this.client,
      where,
      data,
    });
  }

  updateTask({
    where,
    data,
  }: {
    where: FindTaskWhereUniqueInput;
    data: UpdateTaskInput;
  }) {
    return updateTask({
      client: this.client,
      where,
      data,
    });
  }

  deleteTaskTemplate({ where }: { where: FindTaskWhereUniqueInput }) {
    return deleteTaskTemplate({
      client: this.client,
      where,
    });
  }

  deleteTask({ where }: { where: FindTaskWhereUniqueInput }) {
    return deleteTask({
      client: this.client,
      where,
    });
  }
}
