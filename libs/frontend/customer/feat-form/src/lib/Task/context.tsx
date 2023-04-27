import { createContext, useContext } from 'react';
import { UseTaskFormReturn } from './types';

export const TaskFormContext = createContext<UseTaskFormReturn | null>(null);

export const useTaskFormContext = () => {
  const context = useContext(TaskFormContext);

  if (!context) {
    throw new Error(
      'useTaskFormContext must be wrapped in TaskFormContext.Provider'
    );
  }

  return context;
};
