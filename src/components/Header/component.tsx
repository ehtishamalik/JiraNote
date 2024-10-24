import { Button } from '../Button';
import { HeaderProps } from './types';

export const Header = ({
  exportCallback,
  viewCallback,
  addAnotherCallback,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__heading">jira notes</h1>
        <div className="header__actions">
          <Button text="view" onclickCallback={viewCallback} />
          <Button
            text="export"
            icon="export"
            onclickCallback={exportCallback}
          />
          <Button text="add another" onclickCallback={addAnotherCallback} />
        </div>
      </div>
    </header>
  );
};
