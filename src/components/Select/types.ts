export type SelectOptionValue = string;

export type SelectOption = {
  label: string;
  value: SelectOptionValue;
};

export type SelectProps = {
  id: string;
  selectedValue: SelectOptionValue;
  onChangeCallback?: (value: SelectOptionValue, key: string) => void;
};
