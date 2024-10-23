import { SelectOptionValue } from '../../types';

export type SearchSelectProps = {
  id: string;
  selectedValue: SelectOptionValue;
  disabled?: boolean;
  onChangeCallback?: (
    value: SelectOptionValue,
    label: string,
    key: string
  ) => void;
};
