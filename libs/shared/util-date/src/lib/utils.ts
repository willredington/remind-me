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

export function findNonOverlappingRanges({
  dateTime,
  dateRanges,
  taskDurationInMinutes,
}: {
  dateTime: DateTime;
  dateRanges: DateRange[];
  taskDurationInMinutes: number;
}): DateRange[] {
  const startOfDay = dateTime.startOf('day');
  const endOfDay = dateTime.endOf('day');

  const dateRangesWithBoundary = [
    [startOfDay.toJSDate(), startOfDay.toJSDate()],
    ...dateRanges,
    [endOfDay.toJSDate(), endOfDay.toJSDate()],
  ];

  const nonOverlappingRanges: DateRange[] = [];

  let currentRangeEnd = startOfDay;

  for (const [rangeStart, rangeEnd] of dateRangesWithBoundary) {
    const timeBetweenRangesInMinutes = Math.floor(
      DateTime.fromJSDate(rangeStart).diff(currentRangeEnd, 'minutes').minutes
    );

    if (timeBetweenRangesInMinutes >= taskDurationInMinutes) {
      const newRangeStart = currentRangeEnd;

      const newRangeEnd = currentRangeEnd
        .plus({ minutes: taskDurationInMinutes })
        .toJSDate();

      // Check if the new slot overlaps with any of the date ranges
      let overlapFound = false;
      for (const [rangeStart, rangeEnd] of dateRanges) {
        const isOverlapping =
          newRangeStart < DateTime.fromJSDate(rangeEnd) &&
          DateTime.fromJSDate(newRangeEnd) > DateTime.fromJSDate(rangeStart);

        if (isOverlapping) {
          overlapFound = true;
          break;
        }
      }

      if (!overlapFound) {
        nonOverlappingRanges.push([newRangeStart.toJSDate(), newRangeEnd]);
      }
    }

    currentRangeEnd = DateTime.fromJSDate(rangeEnd);
  }

  return nonOverlappingRanges;
}

export function getMilitaryTimeDifference(start: string, end: string) {
  const startTime = DateTime.fromFormat(start, 'HH:mm');
  const endTime = DateTime.fromFormat(end, 'HH:mm');
  return endTime.diff(startTime, 'minutes').toObject();
}
