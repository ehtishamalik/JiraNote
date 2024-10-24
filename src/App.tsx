import { useState } from 'react';
import { Form } from './components/Form';
import { Header } from './components/Header';
import './styles/index.scss';
import { IRecipient, SelectOption } from './types';
import {
  generateEpicSummary,
  generateTextContent,
  getRecipient,
  getTikcet,
} from './utils';

function App() {
  const [recipients, setRecipients] = useState<IRecipient[]>([getRecipient()]);

  const handleAddMore = (formId: string) => {
    const index = recipients.findIndex((res) => res.id === formId);
    if (index > -1) {
      const newRecipients = [...recipients];
      newRecipients[index].tickets = [
        ...newRecipients[index].tickets,
        getTikcet(),
      ];
      setRecipients(newRecipients);
    }
  };

  const getIndexes = (key: string) => {
    const [formId, rowId] = key.split('-');
    const recipientsIndex = recipients.findIndex((res) => res.id === formId);
    if (recipientsIndex > -1) {
      const recipientsTickets = recipients[recipientsIndex].tickets;
      const ticketIndex = recipientsTickets.findIndex(
        (ticket) => ticket.id === rowId
      );
      if (ticketIndex > -1) {
        return [recipientsIndex, ticketIndex];
      }
    }
    return [-1, -1];
  };

  const handleRecipientsChange = (value: SelectOption, key: string) => {
    const recipientsIndex = recipients.findIndex((res) => res.id === key);

    if (recipientsIndex > -1) {
      const newRecipients = [...recipients];
      newRecipients[recipientsIndex].recipient = value;
      setRecipients(newRecipients);
    }
  };

  const handleEpicChange = (value: SelectOption, key: string) => {
    const [recipientsIndex, ticketIndex] = getIndexes(key);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const newRecipients = [...recipients];
      newRecipients[recipientsIndex].tickets[ticketIndex].epic = value;
      if (!value.value) {
        newRecipients[recipientsIndex].tickets[ticketIndex].points = 0;
      }
      setRecipients(newRecipients);
    }
  };

  const handlePointsChange = (value: string, key: string) => {
    const [recipientsIndex, ticketIndex] = getIndexes(key);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const newRecipients = [...recipients];
      const validValue = isNaN(value as unknown as number) ? 0 : Number(value);
      newRecipients[recipientsIndex].tickets[ticketIndex].points = validValue;
      const totalPoints = newRecipients[recipientsIndex].tickets.reduce(
        (sum, ticket) => sum + ticket.points,
        0
      );
      newRecipients[recipientsIndex].totalPoints = totalPoints;
      setRecipients(newRecipients);
    }
  };

  const handleExport = () => {
    const textContent = generateTextContent(recipients);
    const epicSummary = generateEpicSummary(recipients);
    const blob = new Blob(
      [
        '\n**** Recipients Summary ****\n',
        textContent,
        '\n\n\n**** Epic Summary ****\n\n',
        epicSummary,
      ],
      {
        type: 'text/plain',
      }
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'JiraNotes.txt';
    link.click();
    URL.revokeObjectURL(link.href); // Cleanup
  };

  const handleAddAnother = () => {
    const newRecipients = [...recipients, getRecipient()];
    setRecipients(newRecipients);
  };

  return (
    <>
      <Header
        addAnotherCallback={handleAddAnother}
        exportCallback={handleExport}
      />
      {recipients.map((recipient, index) => (
        <Form
          key={index}
          formData={recipient}
          recipientsChangeCallback={handleRecipientsChange}
          addMoreCallback={handleAddMore}
          epicChangeCallback={handleEpicChange}
          pointsChangeCallback={handlePointsChange}
        />
      ))}
    </>
  );
}

export default App;
