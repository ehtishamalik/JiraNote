import { useState } from 'react';
import { IRecipient, SelectOption } from './types';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FormContextProvider } from './contexts';
import {
  // generateRecipientSummary,
  // generateEpicSummary,
  handleFileExport,
  getRecipient,
  getTikcet,
} from './utils';
import './styles/index.scss';
import { ViewText } from './components/ViewText';

function App() {
  const [recipientsValues, setRecipientsValues] = useState<IRecipient[]>([
    getRecipient(),
  ]);
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Jira Note');

  const handleAddMore = (formId: string) => {
    const index = recipientsValues.findIndex((res) => res.id === formId);
    if (index > -1) {
      const newRecipients = [...recipientsValues];
      newRecipients[index].tickets = [
        ...newRecipients[index].tickets,
        getTikcet(),
      ];
      setRecipientsValues(newRecipients);
    }
  };

  const getIndexes = (key: string) => {
    const [formId, rowId] = key.split('-');
    const recipientsIndex = recipientsValues.findIndex(
      (res) => res.id === formId
    );
    if (recipientsIndex > -1) {
      const recipientsTickets = recipientsValues[recipientsIndex].tickets;
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
    const recipientsIndex = recipientsValues.findIndex((res) => res.id === key);

    if (recipientsIndex > -1) {
      const newRecipients = [...recipientsValues];
      newRecipients[recipientsIndex].recipient = value;
      setRecipientsValues(newRecipients);
    }
  };

  const handleEpicChange = (value: SelectOption, key: string) => {
    const [recipientsIndex, ticketIndex] = getIndexes(key);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const newRecipients = [...recipientsValues];
      newRecipients[recipientsIndex].tickets[ticketIndex].epic = value;
      if (!value.value) {
        newRecipients[recipientsIndex].tickets[ticketIndex].points = 0;
      }
      setRecipientsValues(newRecipients);
    }
  };

  const handlePointsChange = (value: string, key: string) => {
    const [recipientsIndex, ticketIndex] = getIndexes(key);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const newRecipients = [...recipientsValues];
      const validValue = isNaN(value as unknown as number) ? 0 : Number(value);
      newRecipients[recipientsIndex].tickets[ticketIndex].points = validValue;
      const totalPoints = newRecipients[recipientsIndex].tickets.reduce(
        (sum, ticket) => sum + ticket.points,
        0
      );
      newRecipients[recipientsIndex].totalPoints = totalPoints;
      setRecipientsValues(newRecipients);
    }
  };

  const handleRowDuplication = (event: React.MouseEvent<HTMLImageElement>) => {
    const key = event.target as HTMLElement;
    const [recipientsIndex, ticketIndex] = getIndexes(key.id);
    if (recipientsIndex > -1 && ticketIndex > -1) {
      const newRecipients = [...recipientsValues];

      const allTickets = newRecipients[recipientsIndex].tickets;
      const ticketToDuplicate = {
        ...newRecipients[recipientsIndex].tickets[ticketIndex],
        id: String(Date.now()),
      };

      allTickets.splice(ticketIndex + 1, 0, ticketToDuplicate);
      newRecipients[recipientsIndex].tickets = allTickets;
      setRecipientsValues(newRecipients);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleExport = () => {
    handleFileExport(recipientsValues, title);
  };

  const handleView = () => {
    setShowTextarea(true);
  };

  const handleAddAnother = () => {
    const newRecipients = [...recipientsValues, getRecipient()];
    setRecipientsValues(newRecipients);
  };

  const handleGetData = (values: IRecipient[]) => {
    setRecipientsValues(values);
  };

  const closeViewText = () => {
    setShowTextarea(false);
  };

  return (
    <>
      <Header title={title} onTitleChange={handleTitleChange} />
      <main className="page-main">
        <section className="page-layout">
          <div className="page-layout__container">
            <FormContextProvider>
              {recipientsValues.map((recipient, index) => (
                <Form
                  key={index}
                  formData={recipient}
                  recipientsChangeCallback={handleRecipientsChange}
                  addMoreCallback={handleAddMore}
                  epicChangeCallback={handleEpicChange}
                  pointsChangeCallback={handlePointsChange}
                  duplicationCallback={handleRowDuplication}
                />
              ))}
            </FormContextProvider>
          </div>
          <ViewText
            showText={showTextarea}
            recipients={recipientsValues}
            title={title}
            closeCallback={closeViewText}
          />
        </section>
      </main>
      <Footer
        getCallback={handleGetData}
        exportCallback={handleExport}
        viewCallback={handleView}
        addAnotherCallback={handleAddAnother}
      />
    </>
  );
}

export default App;
