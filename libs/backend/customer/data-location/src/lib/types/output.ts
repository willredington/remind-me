import { DbLocation } from '@remind-me/backend/customer/data-db';
import { LocationType } from '@remind-me/shared/util-location';

export type Location = Omit<DbLocation, 'type'> & {
  type: LocationType;
};
