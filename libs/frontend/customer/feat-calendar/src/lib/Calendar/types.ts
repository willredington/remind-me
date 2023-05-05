import { Task } from '@remind-me/shared/util-task';

export type CalendarEvent = {
  task: Task;
  title: string;
  description?: string | null;
  start: Date;
  end: Date;
};
