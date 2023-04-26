import { Task } from '@remind-me/shared/util-task';

// task A: origin -> dest -> dest -> dest

export function buildTrip(tasks: Task[]) {
  return tasks.reduce((acc, task) => {
    // if the last location is the same as
  }, []);
}
