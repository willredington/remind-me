import {
  LatitudeDirection,
  Location,
  LocationType,
  LongitudeDirection,
} from '@remind-me/shared/util-location';
import { LocationIn } from './types/internal';

export function shimLocation(record: LocationIn): Location {
  return {
    ...record,
    type: record.type as LocationType,
    latitudeDirection: record.latitudeDirection as LatitudeDirection,
    longitudeDirection: record.longitudeDirection as LongitudeDirection,
  };
}
