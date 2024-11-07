import {
  ContentResponse,
  ContentSummarized,
  IRecipient,
  ITicket,
} from '../types';

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
        .map(
          ([epic, points]) => `${markdown ? ' - ' : '- '}${epic} - ${points}`
        )
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

  return { summaryLines, overallTotal };
};

export const handleFileExport = (recipients: IRecipient[], title: string) => {
  const recipientSummary = generateRecipientSummary(recipients, true);
  const EpicSummary = generateEpicSummary(recipients);
  const blob = new Blob(
    [
      '\n# ',
      title,
      `\n\n## Total: ${EpicSummary.overallTotal}`,
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

export const getInitials = (name: string) => {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

export const ticketsAssignment = (
  content: ContentSummarized[]
): IRecipient[] => {
  const recipientsMap: {
    [key: string]: {
      recipient: string;
      tickets: ITicket[];
      totalPoints: number;
    };
  } = {};

  content.forEach((entry, index) => {
    const { epic, points, recipient } = entry;

    if (!recipientsMap[recipient]) {
      recipientsMap[recipient] = {
        recipient,
        tickets: [],
        totalPoints: 0,
      };
    }

    const ticket: ITicket = {
      id: String(index),
      epic: { label: epic, value: epic },
      points: points,
    };

    recipientsMap[recipient].tickets.push(ticket);
    recipientsMap[recipient].totalPoints += points;
  });

  const recipients: IRecipient[] = Object.values(recipientsMap).map(
    (recipientData, index) => ({
      id: String(index),
      recipient: {
        label: recipientData.recipient,
        value: getInitials(recipientData.recipient),
      },
      totalPoints: recipientData.totalPoints,
      tickets: recipientData.tickets,
    })
  );

  return recipients;
};

export const summarizeTicketsByRecipient = (content: ContentResponse) => {
  const contentSummarized: ContentSummarized[] = [];

  content.issues.forEach((issue) => {
    const { customfield_10025, epic, assignee } = issue.fields;
    if (!epic || !customfield_10025 || !assignee) return;
    contentSummarized.push({
      epic: epic.summary,
      points: customfield_10025,
      recipient: assignee.displayName,
    });
  });

  return ticketsAssignment(contentSummarized);
};
