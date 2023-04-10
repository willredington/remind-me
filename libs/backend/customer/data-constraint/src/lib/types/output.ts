import { DbGlobalConstraint } from '@remind-me/backend/customer/data-db';
import { ConstraintType } from '@remind-me/shared/util-constraint';

export type GlobalConstraint = Omit<DbGlobalConstraint, 'type'> & {
  type: ConstraintType;
};
