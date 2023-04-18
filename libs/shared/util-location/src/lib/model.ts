import { z } from 'zod';

export enum LocationType {
  Home = 'Home',
  Grocery = 'Grocery',
  Gym = 'Gym',
  Religious = 'Religious',
  Work = 'Work',
  School = 'School',
  Other = 'Other',
}

export enum LatitudeDirection {
  North = 'North',
  South = 'South',
}

export enum LongitudeDirection {
  East = 'East',
  West = 'West',
}

export const Location = z.object({
  id: z.string(),
  isPreferred: z.boolean().nullish(),
  type: z.nativeEnum(LocationType),
  address: z.string(),
  name: z.string().nullish(),
  description: z.string().nullish(),
  latitude: z.number(),
  longitude: z.number(),
  latitudeDirection: z.nativeEnum(LatitudeDirection),
  longitudeDirection: z.nativeEnum(LongitudeDirection),
});

export type Location = z.infer<typeof Location>;

export type CoordinatePoint = Pick<
  Location,
  'latitude' | 'longitude' | 'latitudeDirection' | 'longitudeDirection'
>;
