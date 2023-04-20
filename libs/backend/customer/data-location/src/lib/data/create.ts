import { type DbClient } from '@remind-me/backend/customer/data-db';
import { Location } from '@remind-me/shared/util-location';
import { shimLocation } from '../shim';
import { CreateLocationInput } from '../types';

export function createLocation({
  client,
  data,
}: {
  client: DbClient;
  data: CreateLocationInput;
}): Promise<Location> {
  return client.location
    .create({
      data,
    })
    .then(shimLocation);
}
