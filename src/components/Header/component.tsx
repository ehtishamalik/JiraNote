import { Button } from '../Button';
import { HeaderProps } from './types';

export const Header = ({}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__heading">jira notes</h1>
        <div className="header__actions">
          <Button text="export" icon="export" />
          <Button text="add another" />
        </div>
      </div>
    </header>
  );
};
