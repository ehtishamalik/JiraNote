import { useState } from 'react';
import { Form } from './components/Form';
import { Header } from './components/Header';
import './styles/index.scss';
import { IRecipient, SelectOption } from './types';
import {
  generateEpicSummary,
  generateRecipientSummary,
  getRecipient,
  getTikcet,
} from './utils';

function App() {
  const [recipients, setRecipients] = useState<IRecipient[]>([getRecipient()]);
  const [textContent, setTextContent] = useState<string>('');
  const [title, setTitle] = useState<string>('Jira Notes');

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

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    if (value) setTextContent(value);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleExport = () => {
    const recipientSummary = generateRecipientSummary(recipients, true);
    const EpicSummary = generateEpicSummary(recipients);
    const blob = new Blob(
      [
        '\n# ',
        title,
        `\n\n## Total: ${EpicSummary[1]}`,
        '\n\n',
        recipientSummary,
        '\n',
      ],
      {
        type: 'text/plain',
      }
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'JiraNotes.md';
    link.click();
    URL.revokeObjectURL(link.href); // Cleanup
  };

  const handleView = () => {
    const recipientSummary = generateRecipientSummary(recipients);
    const [epicSummary, overallTotal] = generateEpicSummary(recipients);
    setTextContent(
      `${title}\n\n${recipientSummary}\n\n\n**** Epics Summary ****\nTotal: ${overallTotal}\n\n${epicSummary}\n`
    );
  };

  const handleAddAnother = () => {
    const newRecipients = [...recipients, getRecipient()];
    setRecipients(newRecipients);
  };

  return (
    <>
      <Header
        onTitleChange={handleTitleChange}
        addAnotherCallback={handleAddAnother}
        viewCallback={handleView}
        exportCallback={handleExport}
      />
      <main className="page-layout">
        <div className="page-layout__container">
          <div className="page-layout__forms">
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
          </div>
          <div className="page-layout__textarea">
            <textarea
              name="recipient-summary"
              id="recipient-summary-textarea"
              placeholder="Recipient Summary..."
              value={textContent}
              onChange={handleChangeTextArea}
            ></textarea>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
