import { InputFieldProps } from './types';

export const InputField = ({
  id,
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
        onChange={handleOnChange}
      />
    </div>
  );
};
