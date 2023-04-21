import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  createRecurringTaskTemplate,
  createTask,
  deleteRecurringTaskTemplate,
  deleteTask,
  findManyRecurringTaskTemplates,
  findManyTasks,
  findUniqueTask,
  updateRecurringTaskTemplate,
  updateTask,
} from '../data';
import {
  CreateRecurringTaskTemplateInput,
  CreateTaskInput,
  FindRecurringTaskTemplateWhereManyInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '../types';

export class ScheduleService {
  constructor(private readonly client: DbClient) {}

  findManyRecurringTaskTemplates({
    where,
  }: {
    where: FindRecurringTaskTemplateWhereManyInput;
  }) {
    return findManyRecurringTaskTemplates({
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

  createRecurringTaskTemplate({
    data,
  }: {
    data: CreateRecurringTaskTemplateInput;
  }) {
    return createRecurringTaskTemplate({
      client: this.client,
      data,
    });
  }

  createTask({ data }: { data: CreateTaskInput }) {
    return createTask({
      client: this.client,
      data,
    });
  }

  updateRecurringTaskTemplate({
    where,
    data,
  }: {
    where: FindTaskWhereUniqueInput;
    data: UpdateTaskInput;
  }) {
    return updateRecurringTaskTemplate({
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

  deleteRecurringTaskTemplate({ where }: { where: FindTaskWhereUniqueInput }) {
    return deleteRecurringTaskTemplate({
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
