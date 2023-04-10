import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimLocation } from '../shim';
import { Location, FindLocationWhereManyInput } from '../types';

export async function findManyLocations({
  client,
  where,
}: {
  client: DbClient;
  where: FindLocationWhereManyInput;
}): Promise<Location[]> {
  console.log('where', where);
  const locations = await client.location.findMany({
    where,
  });

  return locations.map(shimLocation);
}
