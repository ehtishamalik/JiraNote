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

export const generateRecipientSummary = (
  recipients: IRecipient[],
  markdown = false
) => {
  return recipients
    .map((recipient) => {
      if (!recipient.recipient.value) return '';
      const recipientLine = `${markdown ? '### ' : ''}${
        recipient.recipient.value
      } - ${recipient.totalPoints}`;

      const ticketsLines = recipient.tickets
        .map((ticket) => {
          if (!ticket.epic.value) return '';
          return `${markdown ? ' - ' : ''}${ticket.epic.value} - ${
            ticket.points
          }`;
        })
        .join('\n');

      return `${recipientLine}\n${ticketsLines}\n\n`;
    })
    .join('');
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

  const overallTotal = Object.values(epicTotals).reduce(
    (acc, num) => acc + num,
    0
  );

  const summaryLines = Object.entries(epicTotals)
    .map(([epic, totalPoints]) => `${epic} - ${totalPoints}`)
    .join('\n');

  return [summaryLines, overallTotal];
};

export const capitalizeAllWords = (string: string) => {
  if (!string) return '';
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const handleFileExport = (recipients: IRecipient[], title: string) => {
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
