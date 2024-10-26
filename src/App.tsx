import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { IRecipient, SelectOption } from './types';
import {
  generateEpicSummary,
  generateRecipientSummary,
  getRecipient,
  getTikcet,
  handleFileExport,
} from './utils';
import { fetchOptions } from './api';
import { formContext } from './contexts';
import './styles/index.scss';

function App() {
  const [Recipients, setRecipients] = useState<SelectOption[]>([]);
  const [Epics, setEpics] = useState<SelectOption[]>([]);
  const [recipientsValues, setRecipientsValues] = useState<IRecipient[]>([
    getRecipient(),
  ]);
  const [textContent, setTextContent] = useState<string>('');
  const [title, setTitle] = useState<string>('Jira Notes');

  useEffect(() => {
    const loadOptions = async () => {
      const value = await fetchOptions('/json/recipients.json');
      setRecipients(value);
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const loadOptions = async () => {
      const value = await fetchOptions('/json/epics.json');
      setEpics(value);
    };

    loadOptions();
  }, []);

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
    handleFileExport(recipientsValues, title);
  };

  const handleView = () => {
    const recipientSummary = generateRecipientSummary(recipientsValues);
    const [epicSummary, overallTotal] = generateEpicSummary(recipientsValues);
    setTextContent(
      `${title}\n\n${recipientSummary}\n\n\n**** Epics Summary ****\nTotal: ${overallTotal}\n\n${epicSummary}\n`
    );
  };

  const handleAddAnother = () => {
    const newRecipients = [...recipientsValues, getRecipient()];
    setRecipientsValues(newRecipients);
  };

  const handleUpdateEpics = (value: SelectOption) => {
    setEpics([...Epics, value]);
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
            <formContext.Provider
              value={{ Epics, Recipients, updateEpics: handleUpdateEpics }}
            >
              {recipientsValues.map((recipient, index) => (
                <Form
                  key={index}
                  formData={recipient}
                  recipientsChangeCallback={handleRecipientsChange}
                  addMoreCallback={handleAddMore}
                  epicChangeCallback={handleEpicChange}
                  pointsChangeCallback={handlePointsChange}
                />
              ))}
            </formContext.Provider>
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
