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

export function getDateRangeForMonth(date: Date): [Date, Date] {
  const dateTime = DateTime.fromJSDate(date);
  const startOfMonth = dateTime.startOf('month');
  const endOfMonth = dateTime.endOf('month');

  return [
    startOfMonth
      .minus({
        weeks: 1,
      })
      .toJSDate(),
    endOfMonth
      .plus({
        weeks: 1,
      })
      .toJSDate(),
  ];
}
