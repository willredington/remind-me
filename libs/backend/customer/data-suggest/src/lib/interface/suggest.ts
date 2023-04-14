import { type DbClient } from '@remind-me/backend/customer/data-db';
import { type TaskService } from '@remind-me/backend/customer/data-task';
import { type LocationService } from '@remind-me/backend/customer/data-location';
import { type ConstraintService } from '@remind-me/backend/customer/data-constraint';
import {
  orderRecurringTasksByPriority,
  RecurringTask,
} from '@remind-me/shared/util-task';
import { convertFrequencyToSeconds } from '@remind-me/shared/util-frequency';
import { DateTime, Duration, Interval } from 'luxon';

function iterateDateRange(start: DateTime, end: DateTime): DateTime[] {
  const dates: DateTime[] = [];
  let currentDate: DateTime = start;

  while (currentDate <= end) {
    dates.push(currentDate);
    currentDate = currentDate.plus({ days: 1 });
  }

  return dates;
}

// priority (TODO)
// proximity to locations
// try to fill out the tasks as much as possible

// if (
//   deltaSeconds >= frequencySeconds
//   && currentDateTime >= startTime
//   && currentDateTime <= endTime
// ) {

export class SuggestService {
  constructor(
    private readonly client: DbClient,
    private readonly taskService: TaskService,
    private readonly locationService: LocationService,
    private readonly constraintService: ConstraintService
  ) {}

  private getEligibleRecurringTasks({
    tasks,
    dateRange: [start, end],
  }: {
    tasks: RecurringTask[];
    dateRange: [Date, Date];
  }): Map<number, RecurringTask[]> {
    const assignedTaskIds = new Set<string>();
    const eligibleTasks = new Map<number, RecurringTask[]>();

    const datesInRange = iterateDateRange(
      DateTime.fromJSDate(start),
      DateTime.fromJSDate(end)
    );

    for (const date of datesInRange) {
      // todo
    }

    const foo = tasks.filter((task) => {
      if (task.lastCompletedAt && !assignedTaskIds.has(task.id)) {
        const frequencyInSeconds = convertFrequencyToSeconds(task.frequency);
      }

      // freq = once per day, will be eligible during the week if
      // diff = last completed -
    });

    return eligibleTasks;
  }

  async getSuggestions({
    ownerId,
    dateRange,
  }: {
    ownerId: string;
    selectedDate: Date;
    dateRange: [Date, Date];
  }) {
    const recurringTasks = orderRecurringTasksByPriority(
      await this.taskService.findManyRecurringTasks({
        where: {
          ownerId,
          dateRange,
        },
      })
    );

    // get tasks that are eligible for selection for a given week first
    // check frequency and last execution time
  }
}
