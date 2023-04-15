import {
  LatitudeDirection,
  Location,
  LocationType,
  LongitudeDirection,
} from '@remind-me/shared/util-location';
import { LocationIn } from './types/internal';

export function shimLocation(record: LocationIn): Location {
  const { coordinatePoint } = record;
  return {
    ...record,
    ...coordinatePoint,
    type: record.type as LocationType,
    latitudeDirection: coordinatePoint.latitudeDirection as LatitudeDirection,
    longitudeDirection:
      coordinatePoint.longitudeDirection as LongitudeDirection,
  };
}
