import {
  LatitudeDirection,
  LocationType,
  LongitudeDirection,
} from '@remind-me/shared/util-location';
import { z } from 'zod';

export const CreateLocationInput = z.object({
  type: z.nativeEnum(LocationType),
  name: z.string(),
  description: z.string().optional(),
  address: z.string(),
  ownerId: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  longitudeDirection: z.nativeEnum(LongitudeDirection),
  latitudeDirection: z.nativeEnum(LatitudeDirection),
});

export type CreateLocationInput = z.infer<typeof CreateLocationInput>;

export const UpdateLocationInput = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .partial();

export type UpdateLocationInput = z.infer<typeof UpdateLocationInput>;

export const FindLocationWhereUniqueInput = z.object({
  id: z.string(),
});

export type FindLocationWhereUniqueInput = z.infer<
  typeof FindLocationWhereUniqueInput
>;

export type FindLocationWhereManyInput = {
  ownerId: string;
};
