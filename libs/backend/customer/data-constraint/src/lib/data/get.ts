import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimGlobalConstraint } from '../shim';
import { FindConstraintWhereManyInput, GlobalConstraint } from '../types';

export async function findManyGlobalConstraints({
  client,
  where,
}: {
  client: DbClient;
  where: FindConstraintWhereManyInput;
}): Promise<GlobalConstraint[]> {
  const constraints = await client.globalConstraint.findMany({
    where,
  });

  return constraints.map(shimGlobalConstraint);
}
