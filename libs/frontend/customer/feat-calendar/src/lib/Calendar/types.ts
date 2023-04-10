import { NonRecurringTask } from '@remind-me/shared/util-task';

export type CalendarEvent = {
  task: NonRecurringTask;
  title: string;
  description?: string | null;
  start: Date;
  end: Date;
};
