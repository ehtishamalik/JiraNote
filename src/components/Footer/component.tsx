import { Button } from '../Button';
import { FooterProps } from './types';

export const Footer = ({
  getCallback,
  exportCallback,
  viewCallback,
  addAnotherCallback,
}: FooterProps) => {
  return (
    <header className="footer">
      <div className="footer__container">
        <div className="footer__actions">
          <div className="footer__actions--left">
            <Button text="parse" onClickCallback={getCallback} />
            <Button
              text="export"
              icon="export"
              onClickCallback={exportCallback}
            />
          </div>
          <div className="footer__actions--right">
            <Button text="view" onClickCallback={viewCallback} />
            <Button text="add another" onClickCallback={addAnotherCallback} />
          </div>
        </div>
      </div>
    </header>
  );
};
