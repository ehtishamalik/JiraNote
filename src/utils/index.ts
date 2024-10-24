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
      if (!recipient.recipient.value) return '';
      const recipientLine = `${recipient.recipient.value} - ${recipient.totalPoints}`;

      const ticketsLines = recipient.tickets
        .map((ticket) => {
          if (!ticket.epic.value) return '';
          return `${ticket.epic.value} - ${ticket.points}`;
        })
        .join('\n');

      return `\n${recipientLine}\n\n${ticketsLines}\n`;
    })
    .join('\n');
};

export const generateEpicSummary = (recipients: IRecipient[]) => {
  const epicTotals: {
    [epic: string]: number;
  } = {};

  recipients.forEach((recipient) => {
    recipient.tickets.forEach((ticket) => {
      if (!ticket.epic.value) return '';
      const epicValue = ticket.epic.value;
      const points = ticket.points;

      if (epicTotals[epicValue]) {
        epicTotals[epicValue] += points;
      } else {
        epicTotals[epicValue] = points;
      }
    });
  });

  const summaryLines = Object.entries(epicTotals)
    .map(([epic, totalPoints]) => `${epic} - ${totalPoints}`)
    .join('\n');

  return summaryLines;
};
