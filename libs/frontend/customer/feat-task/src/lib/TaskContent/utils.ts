import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';

const now = DateTime.now();

export const isToday = (dateTime: DateTime) => dateTime.hasSame(now, 'day');

export const getTaskTimeLabel = (task: Task) => {
  const dateTimeLabels = [
    DateTime.fromJSDate(task.startDate),
    DateTime.fromJSDate(task.endDate),
  ].map((dt) => dt.toLocaleString(DateTime.TIME_SIMPLE));

  return dateTimeLabels.join(' - ');
};
