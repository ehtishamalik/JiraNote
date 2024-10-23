import { SelectOptionValue } from '../../types';

export type SelectProps = {
  id: string;
  selectedValue: SelectOptionValue;
  onChangeCallback?: (
    value: SelectOptionValue,
    label: string,
    key: string
  ) => void;
};
