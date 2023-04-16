import { z } from 'zod';
import { RecurringTaskInstance } from '@remind-me/shared/util-task';

export enum TaskFillStrategy {
  Weekday = 'Weekday',
  Weekend = 'Weekend',
  Even = 'Even',
}

export const TaskSuggestion = RecurringTaskInstance.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TaskSuggestion = z.infer<typeof TaskSuggestion>;
