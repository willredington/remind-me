import { shimLocation } from '@remind-me/backend/customer/data-location';
import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import {
  TaskTemplate,
  Task,
  TaskPriority,
  Trip,
  Schedule,
} from '@remind-me/shared/util-task';
import { TaskTemplateIn, TaskIn, TripIn, ScheduleIn } from './types/internal';

export function shimTaskTemplate(record: TaskTemplateIn): TaskTemplate {
  const template: TaskTemplate = {
    ...record,
    priority: record.priority as TaskPriority,
    location: shimLocation(record.location),
    frequency: null,
  };

  if (record.frequency) {
    return {
      ...template,
      frequency: {
        ...record.frequency,
        unit: record.frequency.unit as FrequencyUnit,
      },
    };
  }

  return template;
}

export function shimTask(record: TaskIn): Task {
  return {
    ...record,
    location: shimLocation(record.location),
  };
}

export function shimTrip(record: TripIn): Trip {
  return {
    ...record,
    origin: shimLocation(record.origin),
    destination: shimLocation(record.destination),
  };
}

export function shimSchedule(record: ScheduleIn): Schedule {
  return {
    ...record,
    tasks: record.tasks.map(shimTask),
    trips: record.trips.map(shimTrip),
  };
}
