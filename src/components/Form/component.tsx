import { useMemo, CSSProperties } from 'react';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { SearchSelect } from '../SearchSelect';
import { Select } from '../Select';
import { lightBgColors } from './constants';
import { FormProps } from './types';
import DuplicateIcon from '/duplicate.svg';

export const Form = ({
  formData,
  recipientsChangeCallback,
  addMoreCallback,
  epicChangeCallback,
  pointsChangeCallback,
  duplicationCallback,
}: FormProps) => {
  const { id, recipient, totalPoints, tickets } = formData;

  const Styles = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * lightBgColors.length);
    const randomColor = lightBgColors[randomNumber];
    return {
      '--bg-color': randomColor,
    } as CSSProperties;
  }, []);

  const handleAddMore = () => {
    addMoreCallback?.(id);
  };

  return (
    <section className="jn-form">
      <div className="jn-form__container" style={Styles}>
        <div className="jn-form__header">
          <div className="jn-form__header--values">
            <Select
              id={id}
              selectedValue={recipient}
              onChangeCallback={recipientsChangeCallback}
            />
            <span className="jn-form__header--total">{totalPoints}</span>
          </div>
          <div className="jn-form__header--actions">
            <Button
              text="add more"
              size="small"
              icon="plus"
              onClickCallback={handleAddMore}
            />
          </div>
        </div>
        <div className="jn-form__layout">
          {tickets.map((ticket, index) => (
            <div key={index} className="jn-form__row">
              <SearchSelect
                id={`${id}-${ticket.id}-epic`}
                selectedValue={ticket.epic}
                disabled={!recipient.value}
                onChangeCallback={epicChangeCallback}
              />
              <span className="jn-form__row--icon">
                {recipient.value && ticket.epic.value && (
                  <img
                    src={DuplicateIcon}
                    alt="Duplicate icon"
                    id={`${id}-${ticket.id}-duplicate`}
                    onClick={duplicationCallback}
                  />
                )}
              </span>
              <InputField
                id={`${id}-${ticket.id}-point`}
                inputType="number"
                placeholder="0"
                disabled={!ticket.epic.value}
                value={ticket.points}
                onChangeCallback={pointsChangeCallback}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
