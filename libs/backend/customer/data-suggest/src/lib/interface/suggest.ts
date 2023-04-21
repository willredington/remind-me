import { type TaskService } from '@remind-me/backend/customer/data-task';
import { convertFrequencyToSeconds } from '@remind-me/shared/util-frequency';
import { TaskTemplate } from '@remind-me/shared/util-task';
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
      [template: TaskTemplate, dateTimes: DateTime[]]
    > = [];

    // TODO: filter by end date
    const templates = await this.taskService.findManyTaskTemplates({
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
        const mostRecentTask = first(
          template.tasks.sort(
            (a, b) => b.endDate.getTime() - a.endDate.getTime()
          )
        );

        if (mostRecentTask == null) {
          return true;
        }

        const lastRunDateTime = DateTime.fromJSDate(mostRecentTask.endDate);

        // if it hasn't happened yet, this template isn't eligible
        if (lastRunDateTime > timeSlot) {
          return false;
        }

        if (template.frequency) {
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
        }

        return false;
      });

      templateSlotResults.push([template, eligibleTimeSlotsForTemplate]);
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
    return await this.getEligibleTaskTemplatesPerTimeSlot({
      dateTime,
      ownerId,
      timeSlotGap: Duration.fromObject({
        minutes: gapSpanInMinutes ?? 15,
      }),
    });
  }
}
