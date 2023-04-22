import {
  DateSelectionMode,
  useAppState,
} from '@remind-me/frontend/customer/util-store';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateRange } from '@remind-me/shared/util-date';
import { useMemo } from 'react';

export const useTasks = () => {
  const [date, dateSelectionMode] = useAppState(
    (state) => [state.selectedDate, state.dateSelectionMode] as const
  );

  const dateRange: DateRange = useMemo(() => {
    return dateSelectionMode === DateSelectionMode.Week
      ? [date.startOf('week').toJSDate(), date.endOf('week').toJSDate()]
      : [date.startOf('month').toJSDate(), date.endOf('month').toJSDate()];
  }, [date, dateSelectionMode]);

  const { isLoading, data: tasksInRange = [] } =
    trpc.task.findManyTasks.useQuery({
      dateRange,
    });

  const tasksForDay = useMemo(() => {
    const start = date.startOf('day').toJSDate();
    const end = date.endOf('day').toJSDate();

    return tasksInRange.filter(
      (task) => task.startDate >= start && task.endDate <= end
    );
  }, [date, tasksInRange]);

  return {
    isLoading,
    tasksInRange,
    tasksForDay,
  };
};
