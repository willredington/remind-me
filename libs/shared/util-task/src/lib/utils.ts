import { RecurringTaskTemplate, TaskPriority } from './model';

const orderedPriority = [
  TaskPriority.High,
  TaskPriority.Medium,
  TaskPriority.Low,
];

export function orderRecurringTaskTemplatesByPriority(
  tasks: RecurringTaskTemplate[]
): RecurringTaskTemplate[] {
  return tasks.sort(
    (taskA, taskB) =>
      orderedPriority.indexOf(taskA.priority ?? TaskPriority.Low) -
      orderedPriority.indexOf(taskB.priority ?? TaskPriority.Low)
  );
}
