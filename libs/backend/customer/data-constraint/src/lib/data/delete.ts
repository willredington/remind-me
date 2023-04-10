import { type DbClient } from '@remind-me/backend/customer/data-db';
import { shimGlobalConstraint } from '../shim';
import { FindConstraintWhereUniqueInput, GlobalConstraint } from '../types';

export function deleteGlobalConstraint({
  client,
  where,
}: {
  client: DbClient;
  where: FindConstraintWhereUniqueInput;
}): Promise<GlobalConstraint> {
  return client.globalConstraint
    .delete({
      where,
    })
    .then(shimGlobalConstraint);
}
