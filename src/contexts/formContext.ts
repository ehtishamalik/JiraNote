import { createContext } from 'react';
import { IFormContext } from './types';
import { InitialFormContext } from './defaults';

export const formContext = createContext<IFormContext>(InitialFormContext);
