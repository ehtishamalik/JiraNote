import { IRecipient, SelectOptionValue } from '../../types';

export type FormProps = {
  formData: IRecipient;
  addMoreCallback?: (formId: string) => void;
  recipientsChangeCallback: (
    value: SelectOptionValue,
    label: string,
    key: string
  ) => void;
  epicChangeCallback: (
    value: SelectOptionValue,
    label: string,
    key: string
  ) => void;
  pointsChangeCallback: (value: string, key: string) => void;
};
