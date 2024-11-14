import { useEffect, useState } from 'react';
import { FormContextProviderProps } from './types';
import { SelectOption } from '../types';
import { fetchEpics, fetchRecipients } from '../api';
import { formContext } from './contexts';

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [Recipients, setRecipients] = useState<SelectOption[]>([]);
  const [Epics, setEpics] = useState<SelectOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const recipients = await fetchRecipients();
      const epics = await fetchEpics();

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
