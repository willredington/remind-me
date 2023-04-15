import { DateTime, Duration, DurationLike } from 'luxon';
import { DateRange } from './types';

export function generateDatesInRange({
  dateRange: [start, end],
  dateGap = Duration.fromObject({
    days: 1,
  }),
}: {
  dateRange: DateRange;
  dateGap?: DurationLike;
}): Date[] {
  const dates: Date[] = [];

  let current = start;

  while (current <= end) {
    dates.push(current);
    current = DateTime.fromJSDate(current).plus(dateGap).toJSDate();
  }

  return dates;
}

export function generateSlotsForDay({
  date,
  slotGap,
}: {
  date: Date;
  slotGap: DurationLike;
}): DateRange[] {
  const startDateTime = DateTime.fromJSDate(date).startOf('day');
  const endDateTime = DateTime.fromJSDate(date).endOf('day');

  const dateRanges: DateRange[] = [];

  let currentDateTime = startDateTime;

  while (currentDateTime <= endDateTime) {
    const nextDateTime = currentDateTime.plus(slotGap);
    dateRanges.push([currentDateTime.toJSDate(), nextDateTime.toJSDate()]);
    currentDateTime = nextDateTime;
  }

  return dateRanges;
}

export function isDateRangeInvalid({
  dateRange: [start, end],
  dateRanges,
}: {
  dateRange: DateRange;
  dateRanges: DateRange[];
}): boolean {
  return dateRanges.some(([dateRangeStart, dateRangeEnd]) => {
    return (
      dateRangeEnd.getTime() >= start.getTime() &&
      dateRangeStart.getTime() <= end.getTime()
    );
  });
}

export function getMilitaryTimeDifference(start: string, end: string) {
  const startTime = DateTime.fromFormat(start, 'HH:mm');
  const endTime = DateTime.fromFormat(end, 'HH:mm');
  return endTime.diff(startTime, 'minutes').toObject();
}
