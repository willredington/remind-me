import { DateTime } from 'luxon';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum DateSelectionMode {
  Week = 'Week',
  Month = 'Month',
}

type AppStateProps = {
  onBoardingIndex: number;
  isOnBoardingComplete: boolean;
  selectedDate: DateTime;
  dateSelectionMode: DateSelectionMode;
};

type AppStateActions = {
  incrementOnBoardingIndex: () => void;
  completeOnBoarding: () => void;
  setSelectedDate: (dateTime: DateTime) => void;
  setDateSelectionMode: (mode: DateSelectionMode) => void;
};

export type AppState = AppStateProps & AppStateActions;

const initialStateProps: AppStateProps = {
  onBoardingIndex: 0,
  isOnBoardingComplete: false,
  selectedDate: DateTime.now(),
  dateSelectionMode: DateSelectionMode.Week,
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

        setSelectedDate: (newDate) => {
          set({
            selectedDate: newDate,
          });
        },

        setDateSelectionMode: (mode) =>
          set({
            dateSelectionMode: mode,
          }),
      }),
      {
        name: 'remind-me-app-state',
      }
    )
  )
);
