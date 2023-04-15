import { type DbClient } from '@remind-me/backend/customer/data-db';
import { Location } from '@remind-me/shared/util-location';
import { shimLocation } from '../shim';
import { FindLocationWhereManyInput, locationArgs } from '../types';

export async function findManyLocations({
  client,
  where,
}: {
  client: DbClient;
  where: FindLocationWhereManyInput;
}): Promise<Location[]> {
  console.log('where', where);
  const locations = await client.location.findMany({
    ...locationArgs,
    where,
  });

  return locations.map(shimLocation);
}
