import { DbGlobalConstraint } from '@remind-me/backend/customer/data-db';
import { ConstraintType } from '@remind-me/shared/util-constraint';
import { GlobalConstraint } from './types';

export function shimGlobalConstraint(
  record: DbGlobalConstraint
): GlobalConstraint {
  return {
    ...record,
    type: record.type as ConstraintType,
  };
}
