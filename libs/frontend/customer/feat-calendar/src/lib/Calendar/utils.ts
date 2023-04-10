import { DateTime } from 'luxon';

export function plusOneHour(date: Date): Date {
  return DateTime.fromJSDate(date)
    .plus({
      hours: 1,
    })
    .toJSDate();
}

export function formatDateStripTime(date: Date): string {
  return date.toISOString().slice(0, 10);
}
