import axios from 'axios';
import { Button } from '../Button';
import { FooterProps } from './types';
import { Sprint } from '../../types';
import { summarizeTicketsByRecipient } from '../../utils';
import { useState } from 'react';

export const Footer = ({
  getCallback,
  exportCallback,
  viewCallback,
  addAnotherCallback,
}: FooterProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetIssues = async () => {
    try {
      setIsLoading(true);
      const responseSprints = await axios('/.netlify/functions/get-sprints');

      if (responseSprints.status !== 200) {
        console.error('Could not get sprints.', responseSprints.data);
        setIsLoading(false);
        return;
      }

      const activeSprint: Sprint[] = responseSprints.data.values.filter(
        (sprint: Sprint) => sprint.state === 'active'
      );

      if (!activeSprint.length) {
        console.error('There are no active sprints.', responseSprints.data);
        setIsLoading(false);
        return;
      }

      const activeSprintId = activeSprint[0].id;

      const responseIssues = await axios(
        `/.netlify/functions/get-issues?sprintid=${activeSprintId}`
      );

      if (responseIssues.status !== 200) {
        console.error('Could not get issues.', responseIssues.data);
        setIsLoading(false);
        return;
      }

      const parsedIssues = summarizeTicketsByRecipient(responseIssues.data);
      setIsLoading(false);
      getCallback(parsedIssues);
    } catch (error) {
      console.error('Could not get values.', error);
      setIsLoading(false);
    }
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
