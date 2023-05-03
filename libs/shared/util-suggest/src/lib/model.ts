import { TaskTemplate } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';

export type TaskSuggestion = [template: TaskTemplate, dateTime: DateTime];
