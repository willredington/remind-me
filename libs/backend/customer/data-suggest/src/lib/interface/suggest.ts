import { type TaskService } from '@remind-me/backend/customer/data-task';
import { convertFrequencyToSeconds } from '@remind-me/shared/util-frequency';
import { RecurringTaskTemplate } from '@remind-me/shared/util-task';
import { first } from 'lodash';
import { DateTime, Duration, DurationLike } from 'luxon';

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
      [date: DateTime, templates: RecurringTaskTemplate[]]
    > = [];

    // TODO: filter by end date
    const templates = await this.taskService.findManyRecurringTaskTemplates({
      where: {
        ownerId,
        isAuto: true,
      },
    });

    let currentTimeSlot = dateTime.startOf('day');
    const endOfDay = dateTime.endOf('day');

    while (currentTimeSlot <= endOfDay) {
      const eligibleTemplatesForTimeSlot = templates.filter((template) => {
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
        if (lastRunDateTime > currentTimeSlot) {
          return false;
        }

        const diffInSeconds = Math.floor(
          currentTimeSlot.diff(lastRunDateTime, 'seconds').seconds
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

      templateSlotResults.push([currentTimeSlot, eligibleTemplatesForTimeSlot]);

      currentTimeSlot = currentTimeSlot.plus(timeSlotGap);
    }

    return templateSlotResults;
  }

  async getSuggestions({
    ownerId,
    dateTime,
  }: {
    ownerId: string;
    dateTime: DateTime;
  }) {
    return await this.getEligibleTaskTemplatesPerTimeSlot({
      dateTime,
      ownerId,
      timeSlotGap: Duration.fromObject({
        minutes: 15,
      }),
    });
  }
}
