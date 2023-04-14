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
    frequency: {
      ...record.frequency,
      unit: record.frequency.unit as FrequencyUnit,
    },
  };
}

export function shimTask(record: TaskIn): Task {
  return {
    ...record,
    templateId: record.templateId ?? undefined,
    lastCompletedAt: record.lastCompletedAt ?? undefined,
  };
}
