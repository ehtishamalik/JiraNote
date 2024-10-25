import { SelectProps } from './types';
import { useEffect, useMemo, useState, MouseEvent } from 'react';
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
      (item) => item.value === selectedValue.value
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

  const handleOnChange = (event: MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    const { dataset } = target;
    onChangeCallback?.(dataset as SelectOption, id);
  };

  const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeCallback?.({ label: '', value: '' }, id);
  };

  return (
    <div className="jn-select">
      <div
        id={id}
        className={clsx('jn-select__container', {
          'jn-select__container--active': isOpen,
        })}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        title={selectedLabel}
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
        <ul className="jn-select__options" onClick={handleOnChange}>
          {options.map((option, index) => (
            <li
              key={index}
              data-label={option.label}
              data-value={option.value}
              className={clsx('jn-select__item', {
                selected: option.value === selectedValue.value,
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
