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
): string => {
  return recipients
    .map((recipient) => {
      if (!recipient.recipient.value) return '';

      const recipientLine = `${markdown ? '### ' : '**'}${
        recipient.recipient.value
      } - ${recipient.totalPoints}${markdown ? '' : '**'}`;

      const epicPointsMap: Record<string, number> = {};

      recipient.tickets.forEach((ticket) => {
        if (!ticket.epic.value) return;
        if (!ticket.points) return;
        epicPointsMap[ticket.epic.value] =
          (epicPointsMap[ticket.epic.value] || 0) + ticket.points;
      });

      const ticketsLines = Object.entries(epicPointsMap)
        .map(([epic, points]) => `${markdown ? ' ' : '- '}${epic} - ${points}`)
        .join('\n');

      return `${recipientLine}\n${ticketsLines}\n\n`;
    })
    .join('');
};

export const generateEpicSummary = (recipients: IRecipient[]) => {
  const epicTotals: Record<string, number> = {};

  recipients.forEach((recipient) => {
    if (!recipient.recipient.value) return;
    recipient.tickets.forEach((ticket) => {
      if (!ticket.epic.value) return '';
      const epicValue = ticket.epic.value;
      const points = ticket.points;

      if (points === 0) return;
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
    .map(([epic, totalPoints]) => `- ${epic} - ${totalPoints}`)
    .join('\n');

  return [summaryLines, overallTotal];
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
  link.download = `${title}.md`;
  link.click();
  URL.revokeObjectURL(link.href); // Cleanup
};
