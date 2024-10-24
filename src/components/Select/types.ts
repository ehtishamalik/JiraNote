import { SelectOption } from '../../types';

export type SelectProps = {
  id: string;
  selectedValue: SelectOption;
  onChangeCallback?: (selected: SelectOption, key: string) => void;
};
