import { SelectOptionValue } from '../../types';

export type SearchSelectProps = {
  id: string;
  selectedValue: SelectOptionValue;
  onChangeCallback?: (
    value: SelectOptionValue,
    label: string,
    key: string
  ) => void;
};
