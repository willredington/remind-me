import { shimLocation } from '@remind-me/backend/customer/data-location';
import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import {
  RecurringTaskTemplate,
  Task,
  TaskPriority,
} from '@remind-me/shared/util-task';
import { RecurringTaskTemplateIn, TaskIn } from './types/internal';

export function shimRecurringTaskTemplate(
  record: RecurringTaskTemplateIn
): RecurringTaskTemplate {
  return {
    ...record,
    priority: record.priority as TaskPriority,
    location: shimLocation(record.location),
    frequency: {
      ...record.frequency,
      unit: record.frequency.unit as FrequencyUnit,
    },
  };
}

export function shimTask(record: TaskIn): Task {
  return {
    ...record,
    location: shimLocation(record.location),
  };
}
