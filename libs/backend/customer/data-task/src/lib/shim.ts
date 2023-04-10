import {
  DbNonRecurringTask,
  DbRecurringTask,
} from '@remind-me/backend/customer/data-db';
import { TaskPriority, TaskType } from '@remind-me/shared/util-task';
import { NonRecurringTask, RecurringTask } from './types';

export function shimRecurringTask(record: DbRecurringTask): RecurringTask {
  return {
    ...record,
    type: TaskType.Recurring,
    priority: record.priority as TaskPriority,
  };
}

export function shimNonRecurringTask(
  record: DbNonRecurringTask
): NonRecurringTask {
  return {
    ...record,
    type: TaskType.NonRecurring,
  };
}
