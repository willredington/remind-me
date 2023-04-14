import { RecurringTask, TaskPriority } from './model';

const orderedPriority = [
  TaskPriority.High,
  TaskPriority.Medium,
  TaskPriority.Low,
];

export function orderRecurringTasksByPriority(
  tasks: RecurringTask[]
): RecurringTask[] {
  return tasks.sort(
    (taskA, taskB) =>
      orderedPriority.indexOf(taskA.priority ?? TaskPriority.Low) -
      orderedPriority.indexOf(taskB.priority ?? TaskPriority.Low)
  );
}
