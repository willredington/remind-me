import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import {
  NonRecurringTask,
  RecurringTask,
  TaskType,
} from '@remind-me/shared/util-task';
import { NonRecurringTaskIn, RecurringTaskIn } from './types/internal';

export function shimRecurringTask(record: RecurringTaskIn): RecurringTask {
  return {
    ...record,
    type: TaskType.Recurring,
    frequency: {
      ...record.frequency,
      unit: record.frequency.unit as FrequencyUnit,
    },
  };
}

export function shimNonRecurringTask(
  record: NonRecurringTaskIn
): NonRecurringTask {
  return {
    ...record,
    type: TaskType.NonRecurring,
  };
}
