import { useMemo, CSSProperties } from 'react';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { SearchSelect } from '../SearchSelect';
import { Select } from '../Select';
import { lightBgColors } from './constants';

export const Form = () => {
  const Styles = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * lightBgColors.length);
    const randomColor = lightBgColors[randomNumber];
    return {
      '--bg-color': randomColor,
    } as CSSProperties;
  }, []);

  return (
    <section className="jn-form">
      <div className="jn-form__container" style={Styles}>
        <div className="jn-form__header">
          <div className="jn-form__header--values">
            <Select id="" selectedValue="" />
            <span className="jn-form__header--total"></span>
          </div>
          <div className="jn-form__header--actions">
            <Button text="add more" size="small" icon="plus" />
          </div>
        </div>
        <div className="jn-form__grid">
          <div className="jn-form__row">
            <SearchSelect id="" selectedValue="" />
            <InputField id="" inputType="number" />
          </div>
          <div className="jn-form__row">
            <SearchSelect id="" selectedValue="" />
            <InputField id="" inputType="number" />
          </div>
          <div className="jn-form__row">
            <SearchSelect id="" selectedValue="" />
            <InputField id="" inputType="number" />
          </div>
        </div>
      </div>
    </section>
  );
};
