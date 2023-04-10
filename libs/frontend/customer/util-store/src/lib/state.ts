import { Location } from '@remind-me/shared/util-location';
import {
  NonRecurringLocationTask,
  RecurringLocationTask,
  Task,
} from '@remind-me/shared/util-task';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AppStateProps = {
  onBoardingIndex: number;
  isOnBoardingComplete: boolean;
  locations: Location[];
  recurringTasks: Task[];
  nonRecurringTasks: Task[];
};

type AppStateActions = {
  incrementOnBoardingIndex: () => void;
  completeOnBoarding: () => void;
  addLocation: (location: Location) => void;
  addRecurringTask: (task: RecurringLocationTask) => void;
  addNonRecurringTask: (task: NonRecurringLocationTask) => void;
};

export type AppState = AppStateProps & AppStateActions;

const initialStateProps: AppStateProps = {
  onBoardingIndex: 0,
  isOnBoardingComplete: false,
  locations: [],
  recurringTasks: [],
  nonRecurringTasks: [],
};

localStorage.clear();

export const useAppState = create<AppState>()(
  immer(
    persist(
      (set) => ({
        ...initialStateProps,

        incrementOnBoardingIndex: () =>
          set((draft) => {
            draft.onBoardingIndex++;
          }),

        completeOnBoarding: () =>
          set({
            isOnBoardingComplete: true,
          }),

        addLocation: (location) =>
          set((draft) => {
            draft.locations.push(location);
          }),

        addRecurringTask: (task) =>
          set((draft) => {
            draft.recurringTasks.push(task);
          }),

        addNonRecurringTask: (task) =>
          set((draft) => {
            draft.nonRecurringTasks.push(task);
          }),
      }),
      {
        name: 'remind-me-app-state',
      }
    )
  )
);
