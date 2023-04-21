import { Location } from '@remind-me/shared/util-location';
import { Task, TaskTemplate } from '@remind-me/shared/util-task';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AppStateProps = {
  onBoardingIndex: number;
  isOnBoardingComplete: boolean;
  locations: Location[];
  taskTemplates: Task[];
  nonRecurringTasks: Task[];
};

type AppStateActions = {
  incrementOnBoardingIndex: () => void;
  completeOnBoarding: () => void;
  addLocation: (location: Location) => void;
  addTaskTemplate: (task: TaskTemplate) => void;
  addTask: (task: Task) => void;
};

export type AppState = AppStateProps & AppStateActions;

const initialStateProps: AppStateProps = {
  onBoardingIndex: 0,
  isOnBoardingComplete: false,
  locations: [],
  taskTemplates: [],
  nonRecurringTasks: [],
};

localStorage.clear();

// export const useAppState = create<AppState>()(
//   immer(
//     persist(
//       (set) => ({
//         ...initialStateProps,

//         incrementOnBoardingIndex: () =>
//           set((draft) => {
//             draft.onBoardingIndex++;
//           }),

//         completeOnBoarding: () =>
//           set({
//             isOnBoardingComplete: true,
//           }),

//         addLocation: (location) =>
//           set((draft) => {
//             draft.locations.push(location);
//           }),

//         addTaskTemplate: (task) =>
//           set((draft) => {
//             draft.taskTemplates.push(task);
//           }),

//         addTask: (task) =>
//           set((draft) => {
//             draft.nonRecurringTasks.push(task);
//           }),
//       }),
//       {
//         name: 'remind-me-app-state',
//       }
//     )
//   )
// );
