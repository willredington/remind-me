import { Duration } from 'luxon';
import { Frequency, FrequencyUnit } from './model';

export function convertFrequencyToSeconds(frequency: Frequency): number {
  switch (frequency.unit) {
    case FrequencyUnit.Week:
      return Duration.fromObject({
        weeks: frequency.value,
      }).as('seconds');
    case FrequencyUnit.Day:
      return Duration.fromObject({
        days: frequency.value,
      }).as('seconds');
  }
}
