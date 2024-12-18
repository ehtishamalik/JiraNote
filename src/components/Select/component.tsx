import { SelectProps } from './types';
import { useMemo, useState, MouseEvent, useContext, useRef } from 'react';
import clsx from 'clsx';
import { SelectOption } from '../../types';
import { formContext } from '../../contexts';

export const Select = ({
  id,
  selectedValue,
  onChangeCallback,
}: SelectProps) => {
  const { Recipients } = useContext(formContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [openDirection, setOpenDirection] = useState<'down' | 'up'>('down');

  const selectedLabel: string = useMemo(() => {
    if (!selectedValue.value) return '';
    const selectedOption = Recipients.filter(
      (item) => item.value === selectedValue.value
    );
    return selectedOption.length > 0 ? selectedOption[0].label : '';
  }, [selectedValue, Recipients]);

  const handleOnChange = (event: MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    const { dataset } = target;

    const value: SelectOption = {
      label: dataset.label ?? '',
      value: dataset.value ?? '',
    };

    onChangeCallback(value, id);
  };

  const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeCallback({ label: '', value: '' }, id);
  };

  const handleToggleDropdown = () => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 256 && spaceAbove >= 256) {
        setOpenDirection('up');
      } else {
        setOpenDirection('down');
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="jn-select">
      <div
        id={id}
        className={clsx('jn-select__container', {
          'jn-select__container--active': isOpen,
        })}
        tabIndex={0}
        ref={selectRef}
        onBlur={() => setIsOpen(false)}
        onClick={handleToggleDropdown}
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
        {selectedLabel && (
          <button className="jn-select__clear" onClick={handleReset}>
            &times;
          </button>
        )}
        <span className="jn-select__divider"></span>
        <span className="jn-select__caret"></span>
        <ul
          className={clsx('jn-select__options', {
            'jn-select__options--up': openDirection === 'up',
            'jn-select__options--down': openDirection === 'down',
          })}
          onClick={handleOnChange}
        >
          {Recipients.map((option, index) => (
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
