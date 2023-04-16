import { type ConstraintService } from '@remind-me/backend/customer/data-constraint';
import { type DbClient } from '@remind-me/backend/customer/data-db';
import { type LocationService } from '@remind-me/backend/customer/data-location';
import { type TaskService } from '@remind-me/backend/customer/data-task';
import { convertFrequencyToSeconds } from '@remind-me/shared/util-frequency';
import {
  orderRecurringTaskTemplatesByPriority,
  RecurringTaskTemplate,
  Task,
} from '@remind-me/shared/util-task';
import { DateTime, Duration } from 'luxon';
import {
  DateRange,
  generateDatesInRange,
  isDateRangeInvalid,
  getMilitaryTimeDifference,
  generateSlotsForDay,
  findNonOverlappingRanges,
} from '@remind-me/shared/util-date';
import { calculateAverageDistanceBetweenPoints } from '@remind-me/shared/util-location';

// priority (TODO)
// proximity to locations
// try to fill out the tasks as much as possible

export class SuggestService {
  constructor(
    private readonly client: DbClient,
    private readonly taskService: TaskService,
    private readonly locationService: LocationService,
    private readonly constraintService: ConstraintService
  ) {}

  // diff strategies for filling in RTs:
  // * prioritize weekends, weekdays
  // * split evenly (default)

  private async getEligibleTaskTemplates({
    ownerId,
    dateRange,
  }: {
    ownerId: string;
    dateRange: DateRange;
  }) {
    // TODO: filter by end date
    const templatesByPriority = orderRecurringTaskTemplatesByPriority(
      await this.taskService.findManyRecurringTaskTemplates({
        where: {
          ownerId,
        },
      })
    );

    for (const date of generateDatesInRange({ dateRange })) {
      const dateTime = DateTime.fromJSDate(date);

      const startOfDay = dateTime.startOf('day');
      const endOfDay = dateTime.endOf('day');

      // should be sorted in ascending order
      const tasksForDate = await this.taskService.findManyTasks({
        where: {
          ownerId,
          dateRange: [startOfDay.toJSDate(), endOfDay.toJSDate()],
        },
      });

      const dateRangesFromTasks: DateRange[] = tasksForDate.map((task) => [
        task.startDate,
        task.endDate,
      ]);

      for (const template of templatesByPriority) {
        const possibleDateRangesForTemplate = findNonOverlappingRanges({
          dateTime,
          dateRanges: dateRangesFromTasks,
          taskDurationInMinutes: template.durationInMinutes,
        });
      }
    }

    // const foo = tasks.filter((task) => {
    //   if (task.lastCompletedAt && !assignedTaskIds.has(task.id)) {
    //     const frequencyInSeconds = convertFrequencyToSeconds(task.frequency);
    //   }

    //   // freq = once per day, will be eligible during the week if
    //   // diff = last completed -
    // });
  }

  async getSuggestions({
    ownerId,
    dateRange,
  }: {
    ownerId: string;
    selectedDate: Date;
    dateRange: [Date, Date];
  }) {
    const completedTasksWithTemplates =
      await this.taskService.findManyCompletedTasksWithTemplates({
        where: {
          ownerId,
        },
      });

    const recurringTasks = orderRecurringTaskTemplatesByPriority(
      await this.taskService.findManyRecurringTaskTemplates({
        where: {
          ownerId,
        },
      })
    );

    // get tasks that are eligible for selection for a given week first
    // check frequency and last execution time
  }
}
