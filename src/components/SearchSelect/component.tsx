import { SearchSelectProps } from './types';
import { useEffect, useRef, useState, MouseEvent, useContext } from 'react';
import clsx from 'clsx';
import { SelectOption } from '../../types';
import { formContext } from '../../contexts';

export const SearchSelect = ({
  id,
  selectedValue,
  disabled = false,
  onChangeCallback,
}: SearchSelectProps) => {
  const { Epics, updateEpics } = useContext(formContext);
  const { value: currentValue } = selectedValue;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [openDirection, setOpenDirection] = useState<'down' | 'up'>('down');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const newOptions = Epics.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );

    setOptions(newOptions);
  }, [searchText, Epics]);

  const handleOnOpen = () => {
    if (disabled) return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
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

  const handleOnChangeOption = (event: MouseEvent<HTMLUListElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const { dataset } = target;

    if (dataset.noClick === 'true') {
      return; // Prevent further execution
    }

    const value: SelectOption = {
      label: dataset.label ?? '',
      value: dataset.value ?? '',
    };

    if (dataset.add === 'true' && dataset.label && dataset.value) {
      onChangeCallback(value, id);
      updateEpics(value);
    } else {
      onChangeCallback(value, id);
    }

    setSearchText('');
    setIsOpen(false);
  };

  const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeCallback?.({ label: '', value: '' }, id);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
      if (!currentValue) {
        setSearchText('');
      }
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  return (
    <div className="jn-select">
      <div
        ref={containerRef}
        id={id}
        className={clsx('jn-select__container', {
          'jn-select__container--active': isOpen,
          'jn-select__container--disabled': disabled,
        })}
        tabIndex={0}
        title={selectedValue.value}
        onBlur={handleBlur}
        onClick={handleOnOpen}
      >
        <input
          ref={inputRef}
          type="text"
          className="jn-select__text jn-select__text--input"
          name="search-select-value"
          id={`${id}-id`}
          value={searchText || currentValue}
          placeholder="Select an Epic"
          onChange={handleChangeInput}
        />
        {!disabled && currentValue && (
          <button className="jn-select__clear" onClick={handleReset}>
            &times;
          </button>
        )}
        <span className="jn-select__divider"></span>
        <span className="jn-select__caret"></span>
        <ul
          onClick={handleOnChangeOption}
          className={clsx('jn-select__options', {
            'jn-select__options--up': openDirection === 'up',
            'jn-select__options--down': openDirection === 'down',
          })}
        >
          {options.length ? (
            options.map((option, index) => (
              <li
                key={index}
                data-label={option.label}
                data-value={option.value}
                className={clsx('jn-select__item', {
                  selected: option.value === currentValue,
                })}
              >
                {option.label}
              </li>
            ))
          ) : (
            <>
              <li
                key={0}
                data-no-click="true"
                className="jn-select__item jn-select__item--no-result jn-select__item--disabled"
              >
                No Result - Select below to add
              </li>
              <li
                key={1}
                data-label={searchText}
                data-value={searchText}
                data-add="true"
                className="jn-select__item"
              >
                {searchText}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
