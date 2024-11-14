import { Button } from '../Button';
import { FooterProps } from './types';
import { useState } from 'react';
import { fetchIssues } from '../../api';
import { Loader } from '../Loader';

export const Footer = ({
  getCallback,
  exportCallback,
  viewCallback,
  addAnotherCallback,
}: FooterProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetIssues = async () => {
    setIsLoading(true);
    const response = await fetchIssues();
    if (response?.length) {
      getCallback(response);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__actions">
            <div className="footer__actions--left">
              <Button text="get" onClickCallback={handleGetIssues} />
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
      </footer>
    </>
  );
};
