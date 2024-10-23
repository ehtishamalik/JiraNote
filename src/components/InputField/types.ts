export type InputFieldProps = {
  id: string;
  inputType: 'text' | 'number';
  onChangeCallback?: (value: string, key: string) => void;
};
