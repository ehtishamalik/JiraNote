import { useState } from 'react';
import { Form } from './components/Form';
import { Header } from './components/Header';
import './styles/index.scss';
import { IRecipient, SelectOption } from './types';
import { getRecipient, getTikcet } from './utils';

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
    console.log(value);

    const [recipientsIndex, ticketIndex] = getIndexes(key);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const newRecipients = [...recipients];
      newRecipients[recipientsIndex].tickets[ticketIndex].epic = value;
      if (!value.value) {
        newRecipients[recipientsIndex].tickets[ticketIndex].points = 0;
      }
      console.log(newRecipients);

      setRecipients(newRecipients);
    }
  };

  const handlePointsChange = (value: string, key: string) => {
    if (isNaN(value as unknown as number)) return;
    const [recipientsIndex, ticketIndex] = getIndexes(key);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const validValue = isNaN(value as unknown as number) ? 0 : Number(value);
      const newRecipients = [...recipients];
      newRecipients[recipientsIndex].tickets[ticketIndex].points = validValue;
      setRecipients(newRecipients);
    }
  };

  const handleExport = () => {
    console.log(recipients);
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
