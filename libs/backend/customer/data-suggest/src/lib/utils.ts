import { DateRange } from '@remind-me/shared/util-date';

export function sortByTemporalProximity(
  dateRanges: DateRange[],
  targetDate: Date
): DateRange[] {
  return dateRanges.sort((a, b) => {
    const timeDiffA = Math.abs(targetDate.getTime() - a[0].getTime());
    const timeDiffB = Math.abs(targetDate.getTime() - b[0].getTime());
    return timeDiffA - timeDiffB;
  });
}
