import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimGlobalConstraint } from '../shim';
import { CreateConstraintInput, GlobalConstraint } from '../types';

export function createGlobalConstraint({
  client,
  data,
}: {
  client: DbClient;
  data: CreateConstraintInput;
}): Promise<GlobalConstraint> {
  return client.globalConstraint
    .create({
      data,
    })
    .then(shimGlobalConstraint);
}
