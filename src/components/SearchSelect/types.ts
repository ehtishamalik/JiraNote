import { SelectOption } from '../../types';

export type SearchSelectProps = {
  id: string;
  selectedValue: SelectOption;
  disabled?: boolean;
  onChangeCallback?: (value: SelectOption, key: string) => void;
};
