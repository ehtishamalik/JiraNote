import {
  ContentResponse,
  ContentSummarized,
  IRecipient,
  ITicket,
} from '../types';

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
      completedPoints: number;
    };
  } = {};

  content.forEach((entry, index) => {
    const { epic, points, recipient, status } = entry;

    if (!recipientsMap[recipient]) {
      recipientsMap[recipient] = {
        recipient,
        tickets: [],
        totalPoints: 0,
        completedPoints: 0,
      };
    }

    const ticket: ITicket = {
      id: String(index),
      epic: { label: epic, value: epic },
      points: points,
    };

    recipientsMap[recipient].tickets.push(ticket);
    recipientsMap[recipient].totalPoints += points;
    if (
      ['in deploy', 'in testing', 'done'].includes(status.toLocaleLowerCase())
    ) {
      recipientsMap[recipient].completedPoints += points;
    }
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
      completedPoints: recipientData.completedPoints,
    })
  );

  return recipients;
};

export const summarizeTicketsByRecipient = (content: ContentResponse) => {
  const contentSummarized: ContentSummarized[] = [];

  content.issues.forEach((issue) => {
    const { customfield_10025, epic, assignee, status } = issue.fields;
    if (!epic || !customfield_10025 || !assignee) return;
    contentSummarized.push({
      epic: epic.summary,
      points: customfield_10025,
      recipient: assignee.displayName,
      status: status.name,
    });
  });

  return ticketsAssignment(contentSummarized);
};
