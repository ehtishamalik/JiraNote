import { CSSProperties, useMemo, useState } from 'react';
import { Button } from '../Button';
import { HeaderProps } from './types';
import { InputField } from '../InputField';

export const Header = ({ title, onTitleChange }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const Styles = useMemo(() => {
    return {
      '--input-width': `${title.length + 2}rem`,
    } as CSSProperties;
  }, [title]);

  const handleOnTitleClick = () => {
    setIsActive(true);
  };

  const handleOnTitleSave = () => {
    if (title === '') {
      onTitleChange('Jira Note');
    }
    setIsActive(false);
  };

  const handleOnInputChange = (value: string) => {
    onTitleChange(value);
  };

  return (
    <header className="header">
      <div className="header__container">
        {isActive ? (
          <div className="header__heading--input" style={Styles}>
            <InputField
              id="heading"
              value={title}
              placeholder=""
              inputType="text"
              onChangeCallback={handleOnInputChange}
            />
            <Button
              text="save"
              size="small"
              onClickCallback={handleOnTitleSave}
            />
          </div>
        ) : (
          <h1 onClick={handleOnTitleClick} className="header__heading--value">
            {title}
          </h1>
        )}
      </div>
    </header>
  );
};
