import { IRecipient } from '../../types';
import { Button } from '../Button';
import { FooterProps } from './types';

export const Footer = ({
  getCallback,
  exportCallback,
  viewCallback,
  addAnotherCallback,
}: FooterProps) => {
  const handleGetData = () => {
    const newData: IRecipient[] = [];
    getCallback(newData);
  };
  return (
    <header className="footer">
      <div className="footer__container">
        <div className="footer__actions">
          <div className="footer__actions--left">
            <Button text="get" onClickCallback={handleGetData} />
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
