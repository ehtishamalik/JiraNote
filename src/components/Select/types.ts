export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  onChangeCallback?: (value?: SelectOption) => void;
};
