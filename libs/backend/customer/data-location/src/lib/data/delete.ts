import { type DbClient } from '@remind-me/backend/customer/data-db';
import { Location } from '@remind-me/shared/util-location';
import { shimLocation } from '../shim';
import { FindLocationWhereUniqueInput, locationArgs } from '../types';

export function deleteLocation({
  client,
  where,
}: {
  client: DbClient;
  where: FindLocationWhereUniqueInput;
}): Promise<Location> {
  return client.location
    .delete({
      ...locationArgs,
      where,
    })
    .then(shimLocation);
}
