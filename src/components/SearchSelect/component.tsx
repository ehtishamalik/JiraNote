import { SearchSelectProps } from './types';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { SelectOption } from '../../types';
import { fetchOptions } from '../../api';

export const SearchSelect = ({
  id,
  selectedValue,
  disabled = false,
  onChangeCallback,
}: SearchSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [Epics, setEpics] = useState<SelectOption[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const selectedLabel: string = useMemo(() => {
    const selectedOption = options.filter(
      (item) => item.value === selectedValue
    );
    return selectedOption.length > 0 ? selectedOption[0].label : '';
  }, [selectedValue, options]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadOptions = async () => {
      const value = await fetchOptions('/json/epics.json');
      setOptions(value);
      setEpics(value);
    };

    loadOptions();
  }, []);

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
    setIsOpen(true);
  };

  const handleOnChangeOption =
    (option: SelectOption) => (event: React.MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      onChangeCallback?.(option.value, option.label, id);
      setSearchText('');
      setIsOpen(false);
    };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeCallback?.('', '', id);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
      if (!selectedLabel) {
        setSearchText('');
      }
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onChangeCallback?.('', '', id);
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
        onBlur={handleBlur}
        onClick={handleOnOpen}
      >
        {isOpen || selectedLabel ? (
          <input
            ref={inputRef}
            type="text"
            className="jn-select__text jn-select__text--input"
            name="search-select-value"
            id={`${id}-id`}
            value={searchText || selectedLabel}
            onChange={handleChangeInput}
          />
        ) : (
          <span className="jn-select__text jn-select__text--placeholder">
            Select an Epic
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
          {options.length ? (
            options.map((option, index) => (
              <li
                key={index}
                onClick={handleOnChangeOption(option)}
                className={clsx('jn-select__item', {
                  selected: option.value === selectedValue,
                })}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li key={-1} className={clsx('jn-select__item')}>
              No Result
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
