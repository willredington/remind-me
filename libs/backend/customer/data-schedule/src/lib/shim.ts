import { shimLocation } from '@remind-me/backend/customer/data-location';
import { Schedule } from '@remind-me/shared/util-schedule';
import { ScheduleIn } from './types/internal';

export function shimSchedule(record: ScheduleIn): Schedule {
  return {
    ...record,
    tasks: record.tasks.map((task) => ({
      ...task,
      location: shimLocation(task.location),
    })),
  };
}
