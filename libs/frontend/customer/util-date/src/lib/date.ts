import { DateTime } from 'luxon';

export function setTimeForDateFromString(
  militaryTimeStr: string,
  date: Date
): Date {
  const [hour, minute] = militaryTimeStr.split(':');
  return DateTime.fromJSDate(date)
    .set({
      hour: parseInt(hour),
      minute: parseInt(minute),
    })
    .toJSDate();
}
