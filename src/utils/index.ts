import { IRecipient, ITicket } from '../types';

export const getTikcet = (): ITicket => {
  return {
    id: `${Date.now()}`,
    epic: {
      label: '',
      value: '',
    },
    points: 0,
  };
};

export const getRecipient = (): IRecipient => {
  return {
    id: `${Date.now()}`,
    recipient: {
      label: '',
      value: '',
    },
    totalPoints: 0,
    tickets: [getTikcet()],
  };
};

export const generateTextContent = (recipients: IRecipient[]) => {
  return recipients
    .map((recipient) => {
      const recipientLine = `${recipient.recipient.value} - ${recipient.totalPoints}`;

      const ticketsLines = recipient.tickets
        .map((ticket) => `${ticket.epic.value} - ${ticket.points}`)
        .join('\n');

      return `\n${recipientLine}\n\n${ticketsLines}\n`;
    })
    .join('\n');
};

export const generateEpicSummary = (data: IRecipient[]) => {
  const epicTotals: {
    [epic: string]: number;
  } = {};

  // Aggregate points for each epic
  data.forEach((recipient) => {
    recipient.tickets.forEach((ticket) => {
      const epicValue = ticket.epic.value;
      const points = ticket.points;

      // If the epic already exists, add the points; otherwise, initialize it
      if (epicTotals[epicValue]) {
        epicTotals[epicValue] += points;
      } else {
        epicTotals[epicValue] = points;
      }
    });
  });

  // Format the summary string
  const summaryLines = Object.entries(epicTotals)
    .map(([epic, totalPoints]) => `${epic} - ${totalPoints}`)
    .join('\n');

  return summaryLines;
};
