import { DateTime } from 'luxon';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AppStateProps = {
  onBoardingIndex: number;
  isOnBoardingComplete: boolean;
  selectedDate: DateTime;
};

type AppStateActions = {
  incrementOnBoardingIndex: () => void;
  completeOnBoarding: () => void;
  setSelectedDate: (dateTime: DateTime) => void;
};

export type AppState = AppStateProps & AppStateActions;

const initialStateProps: AppStateProps = {
  onBoardingIndex: 0,
  isOnBoardingComplete: false,
  selectedDate: DateTime.now(),
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
      }),
      {
        name: 'remind-me-app-state',
      }
    )
  )
);
