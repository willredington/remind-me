import { DateTime } from 'luxon';

export function extractTime(date: Date): string {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_24_SIMPLE);
}
