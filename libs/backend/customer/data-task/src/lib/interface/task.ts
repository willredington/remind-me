import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  createTaskTemplate,
  createTask,
  deleteTaskTemplate,
  deleteTask,
  findManyTaskTemplates,
  findManyTasks,
  findUniqueTask,
  updateTaskTemplate,
  updateTask,
} from '../data';
import {
  CreateTaskTemplateInput,
  CreateTaskInput,
  FindTaskTemplateWhereManyInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '../types';

export class TaskService {
  constructor(private readonly client: DbClient) {}

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

  createTask({ data }: { data: CreateTaskInput }) {
    return createTask({
      client: this.client,
      data,
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
