import { InputFieldProps } from './types';

export const InputField = ({
  id,
  value,
  disabled = false,
  inputType,
  onChangeCallback,
}: InputFieldProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChangeCallback?.(value, id);
  };

  return (
    <div className="jn-inputfield">
      <input
        tabIndex={0}
        id={`${id}-id`}
        className={`jn-inputfield__input jn-inputfield__input--${inputType}`}
        name={`${id}-name`}
        type={inputType}
        value={value || ''}
        placeholder="0"
        disabled={disabled}
        onChange={handleOnChange}
      />
    </div>
  );
};
