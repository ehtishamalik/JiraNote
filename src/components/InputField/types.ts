export type InputFieldProps = {
  id: string;
  value: string | number;
  placeholder: string;
  disabled?: boolean;
  inputType: 'text' | 'number';
  onChangeCallback: (value: string, key: string) => void;
};
