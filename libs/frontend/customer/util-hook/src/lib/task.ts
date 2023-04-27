import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateTime } from 'luxon';

export function useSchedule(dateTime: DateTime) {
  return trpc.task.findUniqueOrCreateSchedule.useQuery({
    date: dateTime.startOf('day').toJSDate(),
  });
}
