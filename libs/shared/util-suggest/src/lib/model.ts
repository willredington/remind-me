import { z } from 'zod';
import {
  RecurringTaskInstance,
  RecurringTaskTemplate,
  Task,
} from '@remind-me/shared/util-task';

export enum TaskFillStrategy {
  Weekday = 'Weekday',
  Weekend = 'Weekend',
  Even = 'Even',
  Proximity = 'Proximity',
}

export const taskFillStrategyDescriptionMap: Record<TaskFillStrategy, string> =
  {
    [TaskFillStrategy.Weekday]: 'Will prioritize task filling on weekdays',
    [TaskFillStrategy.Weekend]: 'Will prioritize task filling on weekends',
    [TaskFillStrategy.Even]: 'Will evenly distribute task filling',
    [TaskFillStrategy.Proximity]:
      'Will prioritize task filling based on proximity to locations for existing tasks only',
  };

export type TaskSuggestion = {
  scheduledTask: Task;
  unscheduledTasks: RecurringTaskTemplate[];
};
