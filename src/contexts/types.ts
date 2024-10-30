import { ReactNode } from 'react';
import { SelectOption } from '../types';

export interface IFormContext {
  Epics: SelectOption[];
  Recipients: SelectOption[];
  updateEpics: (value: SelectOption) => void;
}

export interface FormContextProviderProps {
  children: ReactNode;
}
