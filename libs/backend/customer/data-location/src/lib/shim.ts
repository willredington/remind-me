import { type DbLocation } from '@remind-me/backend/customer/data-db';
import { LocationType } from '@remind-me/shared/util-location';
import { Location } from './types';

export function shimLocation(record: DbLocation): Location {
  return {
    ...record,
    type: record.type as LocationType,
  };
}
