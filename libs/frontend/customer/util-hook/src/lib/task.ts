import { DateTime } from 'luxon';
import { trpc } from '@remind-me/frontend/customer/util-trpc';

export function useSchedule(dateTime: DateTime) {
  return trpc.task.findUniqueOrCreateSchedule.useQuery({
    date: dateTime.startOf('day').toJSDate(),
  });
}
