import { SelectOption, SelectProps } from './types';
import participants from '../../json/participants.json';
import { useMemo, useState } from 'react';
import clsx from 'clsx';

export const Select = ({ onChangeCallback }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<SelectOption | undefined>(
    undefined
  );
  const options: SelectOption[] = useMemo(() => participants, []);

  const handleOnChange = (value: SelectOption) => () => {
    setCurrentValue(value);
    onChangeCallback?.(value);
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentValue(undefined);
    onChangeCallback?.(undefined);
  };

  return (
    <div className="jn-select">
      <div
        className="jn-select__container"
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="jn-select__value">{currentValue?.label ?? ''}</span>
        <button className="jn-select__clear" onClick={handleReset}>
          &times;
        </button>
        <span className="jn-select__divider"></span>
        <span className="jn-select__caret"></span>
        <ul
          className={clsx('jn-select__options', {
            show: isOpen,
          })}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={handleOnChange(option)}
              className="jn-select__item"
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
