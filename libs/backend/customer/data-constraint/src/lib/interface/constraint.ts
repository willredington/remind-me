import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  createGlobalConstraint,
  deleteGlobalConstraint,
  findManyGlobalConstraints,
} from '../data';
import {
  CreateConstraintInput,
  FindConstraintWhereManyInput,
  FindConstraintWhereUniqueInput,
} from '../types';

export class ConstraintService {
  constructor(private readonly client: DbClient) {}

  createGlobalConstraint({ data }: { data: CreateConstraintInput }) {
    return createGlobalConstraint({
      client: this.client,
      data,
    });
  }

  findManyGlobalConstraints({
    where,
  }: {
    where: FindConstraintWhereManyInput;
  }) {
    return findManyGlobalConstraints({
      client: this.client,
      where,
    });
  }

  deleteGlobalConstraint({ where }: { where: FindConstraintWhereUniqueInput }) {
    return deleteGlobalConstraint({
      client: this.client,
      where,
    });
  }
}
