import { SelectProps } from './types';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { SelectOption } from '../../types';
import { fetchOptions } from '../../api';

export const Select = ({
  id,
  selectedValue,
  onChangeCallback,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const selectedLabel: string = useMemo(() => {
    const selectedOption = options.filter(
      (item) => item.value === selectedValue
    );
    return selectedOption.length > 0 ? selectedOption[0].label : '';
  }, [selectedValue, options]);

  useEffect(() => {
    const loadOptions = async () => {
      const value = await fetchOptions('/json/recipients.json');
      setOptions(value);
    };

    loadOptions();
  }, []);

  const handleOnChange = (option: SelectOption) => () => {
    onChangeCallback?.(option.value, option.label, id);
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeCallback?.('', '', id);
  };

  return (
    <div className="jn-select">
      <div
        id={id}
        className={clsx('jn-select__container', {
          active: isOpen,
        })}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel ? (
          <span className="jn-select__text jn-select__text--value">
            {selectedLabel}
          </span>
        ) : (
          <span className="jn-select__text jn-select__text--placeholder">
            Select a Recipient
          </span>
        )}
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
          {options.map((option, index) => (
            <li
              key={index}
              onClick={handleOnChange(option)}
              className={clsx('jn-select__item', {
                selected: option.value === selectedValue,
              })}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
