import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  createNonRecurringTask,
  createRecurringTask,
  deleteNonRecurringTask,
  deleteRecurringTask,
  findManyNonRecurringTasks,
  findManyRecurringTasks,
  findUniqueNonRecurringTask,
  updateNonRecurringTask,
  updateRecurringTask,
} from '../data';
import {
  CreateNonRecurringTaskInput,
  CreateRecurringTaskInput,
  FindTaskWhereManyInput,
  FindTaskWhereUniqueInput,
  UpdateTaskInput,
} from '../types';

export class TaskService {
  constructor(private readonly client: DbClient) {}

  findManyRecurringTasks({ where }: { where: FindTaskWhereManyInput }) {
    return findManyRecurringTasks({
      client: this.client,
      where,
    });
  }

  findUniqueNonRecurringTask({ where }: { where: FindTaskWhereUniqueInput }) {
    return findUniqueNonRecurringTask({
      client: this.client,
      where,
    });
  }

  findManyNonRecurringTasks({ where }: { where: FindTaskWhereManyInput }) {
    return findManyNonRecurringTasks({
      client: this.client,
      where,
    });
  }

  createRecurringTask({ data }: { data: CreateRecurringTaskInput }) {
    return createRecurringTask({
      client: this.client,
      data,
    });
  }

  createNonRecurringTask({ data }: { data: CreateNonRecurringTaskInput }) {
    return createNonRecurringTask({
      client: this.client,
      data,
    });
  }

  updateRecurringTask({
    where,
    data,
  }: {
    where: FindTaskWhereUniqueInput;
    data: UpdateTaskInput;
  }) {
    return updateRecurringTask({
      client: this.client,
      where,
      data,
    });
  }

  updateNonRecurringTask({
    where,
    data,
  }: {
    where: FindTaskWhereUniqueInput;
    data: UpdateTaskInput;
  }) {
    return updateNonRecurringTask({
      client: this.client,
      where,
      data,
    });
  }

  deleteRecurringTask({ where }: { where: FindTaskWhereUniqueInput }) {
    return deleteRecurringTask({
      client: this.client,
      where,
    });
  }

  deleteNonRecurringTask({ where }: { where: FindTaskWhereUniqueInput }) {
    return deleteNonRecurringTask({
      client: this.client,
      where,
    });
  }
}
