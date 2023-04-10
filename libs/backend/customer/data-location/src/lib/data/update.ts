import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimLocation } from '../shim';
import {
  Location,
  FindLocationWhereUniqueInput,
  UpdateLocationInput,
} from '../types';

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
