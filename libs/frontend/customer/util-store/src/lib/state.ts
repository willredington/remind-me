import { DateTime } from 'luxon';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Task } from '@remind-me/shared/util-task';
import { TaskSuggestion } from '@remind-me/shared/util-suggest';
import { Location } from '@remind-me/shared/util-location';

type AppStateProps = {
  onBoardingIndex: number;
  isOnBoardingComplete: boolean;
  selectedDate: DateTime;
  selectedTask: Task | null;
  selectedLocation: Location | null;
  selectedSuggestion: TaskSuggestion | null;
};

type AppStateActions = {
  incrementOnBoardingIndex: () => void;
  completeOnBoarding: () => void;
  setSelectedDate: (dateTime: DateTime) => void;
  setSelectedTask: (task: Task | null) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSelectedSuggestion: (suggestion: TaskSuggestion | null) => void;
};

export type AppState = AppStateProps & AppStateActions;

const initialStateProps: AppStateProps = {
  onBoardingIndex: 0,
  isOnBoardingComplete: false,
  selectedDate: DateTime.now(),
  selectedTask: null,
  selectedLocation: null,
  selectedSuggestion: null,
};

// TODO: remove me
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

        setSelectedDate: (newDate) =>
          set({
            selectedDate: newDate,
          }),

        setSelectedTask: (task) =>
          set({
            selectedTask: task,
          }),

        setSelectedSuggestion: (suggestion) =>
          set({
            selectedSuggestion: suggestion,
          }),

        setSelectedLocation: (location) =>
          set({
            selectedLocation: location,
          }),
      }),
      {
        name: 'remind-me-app-state',
      }
    )
  )
);
