import { type DbClient } from '@remind-me/backend/customer/data-db';
import { FindProfileWhereUniqueInput, Profile } from '../types';

export async function findUniqueProfile({
  client,
  where,
}: {
  client: DbClient;
  where: FindProfileWhereUniqueInput;
}): Promise<Profile> {
  return await client.profile.findUniqueOrThrow({
    where,
  });
}
