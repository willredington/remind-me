import { type DbClient } from '@remind-me/backend/customer/data-db';
import { type TaskService } from '@remind-me/backend/customer/data-task';
import { FindScheduleWhereUnique } from '../types';
import { Schedule } from '@remind-me/shared/util-schedule';
import { scheduleArgs } from '../types/internal';
import { shimSchedule } from '../shim';

export class ScheduleService {
  constructor(
    private readonly client: DbClient,
    private readonly taskService: TaskService
  ) {}

  async findUniqueSchedule({
    where,
  }: {
    where: FindScheduleWhereUnique;
  }): Promise<Schedule> {
    const { ownerId, date } = where;
    return this.client.schedule
      .findUniqueOrThrow({
        ...scheduleArgs,
        where: {
          date_ownerId: {
            date,
            ownerId,
          },
        },
      })
      .then(shimSchedule);
  }
}
