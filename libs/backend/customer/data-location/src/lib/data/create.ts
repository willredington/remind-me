import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimLocation } from '../shim';
import { CreateLocationInput, Location } from '../types';

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
