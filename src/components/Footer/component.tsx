import axios from 'axios';
import { Button } from '../Button';
import { FooterProps } from './types';
import { useState } from 'react';

export const Footer = ({
  getCallback,
  exportCallback,
  viewCallback,
  addAnotherCallback,
}: FooterProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetIssues = async () => {
    setIsLoading(true);
    try {
      const responseIssues = await axios(`/.netlify/functions/get-issues`);

      if (responseIssues.status !== 200) {
        console.error('Could not get issues.', responseIssues.data);
      } else {
        console.log(responseIssues.data);

        getCallback(responseIssues.data);
      }
    } catch (error) {
      console.error('An error occured!', error);
    }
    setIsLoading(false);
  };
  return (
    <header className="footer">
      <div className="footer__container">
        <div className="footer__actions">
          <div className="footer__actions--left">
            <Button
              text="get"
              isLoading={isLoading}
              onClickCallback={handleGetIssues}
            />
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
