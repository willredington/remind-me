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
} from '@remind-me/shared/util-date';
import { calculateAverageDistanceBetweenPoints } from '@remind-me/shared/util-location';

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

  private async getEligibleTaskTemplates({
    ownerId,
    dateRange,
  }: {
    ownerId: string;
    dateRange: DateRange;
  }) {
    const completedTasksWithTemplates =
      await this.taskService.findManyCompletedTasksWithTemplates({
        where: {
          ownerId,
        },
      });

    // TODO: filter by end date
    const templatesByPriority = orderRecurringTaskTemplatesByPriority(
      await this.taskService.findManyRecurringTaskTemplates({
        where: {
          ownerId,
        },
      })
    );

    const completedTemplateMap: Record<string, Date> =
      templatesByPriority.reduce((acc, template) => {
        const completedTask = completedTasksWithTemplates.find(
          (task) => task.templateId === template.id
        );

        if (completedTask && completedTask.lastCompletedAt) {
          return {
            ...acc,
            [template.id]: completedTask.lastCompletedAt,
          };
        }

        return acc;
      }, {});

    const dateTaskMap: Record<number, Task[]> = [];

    for (const date of generateDatesInRange({ dateRange })) {
      const dateTime = DateTime.fromJSDate(date);

      const startOfDay = dateTime.startOf('day');
      const endOfDay = dateTime.endOf('day');

      const tasksForDate = await this.taskService.findManyTasks({
        where: {
          ownerId,
          dateRange: [startOfDay.toJSDate(), endOfDay.toJSDate()],
        },
      });

      const dateRangesFromTasks = tasksForDate.map((task) => [
        task.startDate,
        task.endDate,
      ]);

      const locationsFromTasks = tasksForDate.map((task) => task.location);

      // TODO: get all locations for a given day

      let currentDateTime = startOfDay; // TODO: start and end should be between their waking hours

      while (currentDateTime <= endOfDay) {
        // if tasks already planned, proximity is a factor

        // find the closest RT

        // if proximity, choose closest RT to a task

        // priority
        // proximity to other locations
        // first check if other tasks for the day
        // has a RT already been completed or assigned this week?

        currentDateTime = currentDateTime.plus({
          minutes: 15,
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
