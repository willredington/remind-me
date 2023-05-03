import { type TaskService } from '@remind-me/backend/customer/data-task';
import { convertFrequencyToSeconds } from '@remind-me/shared/util-frequency';
import { TaskSuggestion } from '@remind-me/shared/util-suggest';
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
  }): Promise<TaskSuggestion[]> {
    const templateSlotResults: TaskSuggestion[] = [];

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
      const mostRecentTask = first(
        template.tasks.sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
      );

      if (mostRecentTask == null) {
        templateSlotResults.push([template, timeSlots[0]]);
      } else {
        const lastRunDateTime = DateTime.fromJSDate(mostRecentTask.endDate);

        // this is only eligible for consideration if the instance last ran before today
        if (lastRunDateTime < startOfDay && template.frequency) {
          const frequencyInSeconds = convertFrequencyToSeconds(
            template.frequency
          );

          let minTimeSlot = timeSlots[0];

          while (minTimeSlot < endOfDay) {
            const diffInSeconds = Math.floor(
              minTimeSlot.diff(lastRunDateTime, 'seconds').seconds
            );

            // if the elapsed time has exceeded frequency span, this is eligible for a re-run
            if (diffInSeconds > frequencyInSeconds) {
              templateSlotResults.push([template, minTimeSlot]);
              break;
            }

            minTimeSlot = minTimeSlot.plus(timeSlotGap);
          }
        }
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
    return await this.getEligibleTaskTemplatesPerTimeSlot({
      dateTime,
      ownerId,
      timeSlotGap: Duration.fromObject({
        minutes: gapSpanInMinutes ?? 15,
      }),
    });
  }
}
