import { createContext, useEffect, useState } from 'react';
import { FormContextProviderProps, IFormContext } from './types';
import { InitialFormContext } from './defaults';
import { SelectOption } from '../types';
import { fetchOptions } from '../api';

export const formContext = createContext<IFormContext>(InitialFormContext);

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [Recipients, setRecipients] = useState<SelectOption[]>([]);
  const [Epics, setEpics] = useState<SelectOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const recipients = await fetchOptions('/json/recipients.json');
      const epics = await fetchOptions('/json/epics.json');

      setRecipients(recipients);
      setEpics(epics);
    };

    loadOptions();
  }, []);

  const handleUpdateEpics = (value: SelectOption) => {
    setEpics([...Epics, value]);
  };

  return (
    <formContext.Provider
      value={{ Epics, Recipients, updateEpics: handleUpdateEpics }}
    >
      {children}
    </formContext.Provider>
  );
};
