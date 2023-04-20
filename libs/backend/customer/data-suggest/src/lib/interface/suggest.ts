import { type TaskService } from '@remind-me/backend/customer/data-task';
import { DateRange } from '@remind-me/shared/util-date';
import { convertFrequencyToSeconds } from '@remind-me/shared/util-frequency';
import { RecurringTaskTemplate } from '@remind-me/shared/util-task';
import { first } from 'lodash';
import { DateTime, Duration, DurationLike } from 'luxon';

function generateTimeSlots({
  startDateTime,
  endDateTime,
  timeSlotGap,
}: {
  startDateTime: DateTime;
  endDateTime: DateTime;
  timeSlotGap: DurationLike;
}): DateTime[] {
  const timeSlots: DateTime[] = [];

  let currentTimeSlot = startDateTime;

  while (currentTimeSlot <= endDateTime) {
    timeSlots.push(currentTimeSlot);
    currentTimeSlot = currentTimeSlot.plus(timeSlotGap);
  }

  return timeSlots;
}

export class SuggestService {
  constructor(private readonly taskService: TaskService) {}

  // TODO: this should be smarter to reduce the payload size
  private async getEligibleTaskTemplatesPerTimeSlot({
    ownerId,
    dateTime,
    timeSlotGap,
  }: {
    ownerId: string;
    dateTime: DateTime;
    timeSlotGap: DurationLike;
  }) {
    const templateSlotResults: Array<
      [template: RecurringTaskTemplate, dateRange: DateRange]
    > = [];

    // TODO: filter by end date
    const templates = await this.taskService.findManyRecurringTaskTemplates({
      where: {
        ownerId,
        isAuto: true,
      },
    });

    const startOfDay = dateTime.startOf('day');
    const endOfDay = dateTime.endOf('day');

    const timeSlots = generateTimeSlots({
      startDateTime: startOfDay,
      endDateTime: endOfDay,
      timeSlotGap,
    });

    for (const template of templates) {
      // get all the time slots this template is eligible at
      const eligibleTimeSlotsForTemplate = timeSlots.filter((timeSlot) => {
        const mostRecentInstance = first(
          template.instances.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          )
        );

        if (mostRecentInstance == null) {
          return true;
        }

        const lastRunDateTime = DateTime.fromJSDate(mostRecentInstance.endDate);

        // if it hasn't happened yet, this template isn't eligible
        if (lastRunDateTime > timeSlot) {
          return false;
        }

        const diffInSeconds = Math.floor(
          timeSlot.diff(lastRunDateTime, 'seconds').seconds
        );

        const frequencyInSeconds = convertFrequencyToSeconds(
          template.frequency
        );

        // this can be run again only if the elapsed time has exceeded the frequency
        if (diffInSeconds > frequencyInSeconds) {
          return true;
        }

        return false;
      });

      if (eligibleTimeSlotsForTemplate.length >= 2) {
        const minTimeSlot = eligibleTimeSlotsForTemplate[0];

        const maxTimeSlot =
          eligibleTimeSlotsForTemplate[eligibleTimeSlotsForTemplate.length - 1];

        templateSlotResults.push([
          template,
          [minTimeSlot.toJSDate(), maxTimeSlot.toJSDate()],
        ]);
      }
    }

    return templateSlotResults;
  }

  async getSuggestions({
    ownerId,
    dateTime,
    gapSpanInMinutes,
  }: {
    ownerId: string;
    dateTime: DateTime;
    gapSpanInMinutes?: number;
  }) {
    const templatesWithDateRanges =
      await this.getEligibleTaskTemplatesPerTimeSlot({
        dateTime,
        ownerId,
        timeSlotGap: Duration.fromObject({
          minutes: gapSpanInMinutes ?? 15,
        }),
      });

    const startDate = dateTime.startOf('day');
    const endDate = dateTime.endOf('day');

    const tasksForDay = await this.taskService.findManyTasks({
      where: {
        ownerId,
        dateRange: [startDate.toJSDate(), endDate.toJSDate()],
      },
    });

    for (const task of tasksForDay) {
      //
      //
      // try to add it before, then after if possible
    }
  }
}
