import { type DbClient } from '@remind-me/backend/customer/data-db';
import { Location } from '@remind-me/shared/util-location';
import { shimLocation } from '../shim';
import { FindLocationWhereUniqueInput, UpdateLocationInput } from '../types';

export function updateLocation({
  client,
  where,
  data,
}: {
  client: DbClient;
  where: FindLocationWhereUniqueInput;
  data: UpdateLocationInput;
}): Promise<Location> {
  return client.location
    .update({
      where,
      data,
    })
    .then(shimLocation);
}
