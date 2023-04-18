import { type DbClient } from '@remind-me/backend/customer/data-db';
import {
  createLocation,
  deleteLocation,
  findManyLocations,
  updateLocation,
} from '../data';
import {
  CreateLocationInput,
  FindLocationWhereManyInput,
  FindLocationWhereUniqueInput,
  UpdateLocationInput,
} from '../types';
import { CoordinatePoint } from '@remind-me/shared/util-location';

export class LocationService {
  constructor(private readonly client: DbClient) {}

  findMany({ where }: { where: FindLocationWhereManyInput }) {
    return findManyLocations({
      client: this.client,
      where,
    });
  }

  create({ data }: { data: CreateLocationInput }) {
    return createLocation({
      client: this.client,
      data,
    });
  }

  update({
    where,
    data,
  }: {
    where: FindLocationWhereUniqueInput;
    data: UpdateLocationInput;
  }) {
    return updateLocation({
      client: this.client,
      where,
      data,
    });
  }

  delete({ where }: { where: FindLocationWhereUniqueInput }) {
    return deleteLocation({
      client: this.client,
      where,
    });
  }
}
