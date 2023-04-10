import { z } from 'zod';

export enum FrequencyUnit {
  Day = 'Day',
  Week = 'Week',
}

export const FrequencyUnitDescMap: Record<FrequencyUnit, string> = {
  [FrequencyUnit.Day]: 'Daily',
  [FrequencyUnit.Week]: 'Weekly',
};

export enum FrequencyDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export const ALL_FREQUENCY_DAYS = Object.values(FrequencyDay);

export const Frequency = z.object({
  id: z.string(),
  unit: z.nativeEnum(FrequencyUnit),
  value: z.number(),
  days: z.array(z.string()),
  endDate: z.date().nullish(),
});

export type Frequency = z.infer<typeof Frequency>;
