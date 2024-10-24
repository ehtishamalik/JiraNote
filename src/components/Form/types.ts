import { IRecipient, SelectOption } from '../../types';

export type FormProps = {
  formData: IRecipient;
  addMoreCallback?: (formId: string) => void;
  recipientsChangeCallback: (selected: SelectOption, key: string) => void;
  epicChangeCallback: (selected: SelectOption, key: string) => void;
  pointsChangeCallback: (value: string, key: string) => void;
};
