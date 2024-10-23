export type InputFieldProps = {
  id: string;
  value: number;
  disabled?: boolean;
  inputType: 'text' | 'number';
  onChangeCallback?: (value: string, key: string) => void;
};
