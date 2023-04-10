import { type DbClient } from '@remind-me/backend/customer/data-db';
import { findUniqueProfile } from '../data';
import { FindProfileWhereUniqueInput } from '../types';

export class ProfileService {
  constructor(private readonly client: DbClient) {}

  findUnique({ where }: { where: FindProfileWhereUniqueInput }) {
    return findUniqueProfile({
      client: this.client,
      where,
    });
  }
}
