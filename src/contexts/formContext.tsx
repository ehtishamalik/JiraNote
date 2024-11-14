import { useEffect, useState } from 'react';
import { FormContextProviderProps } from './types';
import { SelectOption } from '../types';
import { fetchEpics, fetchRecipients } from '../api';
import { formContext } from './contexts';
import { Loader } from '../components/Loader';

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Recipients, setRecipients] = useState<SelectOption[]>([]);
  const [Epics, setEpics] = useState<SelectOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const recipients = await fetchRecipients();
      const epics = await fetchEpics();

      setRecipients(recipients);
      setEpics(epics);
      setIsLoading(false);
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
      <Loader isLoading={isLoading} />
      {children}
    </formContext.Provider>
  );
};
