import { TaskTemplate, TaskPriority } from './model';

const orderedPriority = [
  TaskPriority.High,
  TaskPriority.Medium,
  TaskPriority.Low,
];

export function orderTaskTemplatesByPriority(
  tasks: TaskTemplate[]
): TaskTemplate[] {
  return tasks.sort(
    (taskA, taskB) =>
      orderedPriority.indexOf(taskA.priority ?? TaskPriority.Low) -
      orderedPriority.indexOf(taskB.priority ?? TaskPriority.Low)
  );
}
