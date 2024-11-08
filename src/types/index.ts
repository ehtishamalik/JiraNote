export type SelectOption = {
  label: string;
  value: string;
};

export interface ITicket {
  id: string;
  epic: SelectOption;
  points: number;
}

export interface IRecipient {
  id: string;
  recipient: SelectOption;
  totalPoints: number;
  completedPoints: number;
  tickets: ITicket[];
}

export interface ContentSummarized {
  points: number;
  epic: string;
  recipient: string;
  status: string;
}

export interface ContentResponse {
  issues: {
    fields: {
      customfield_10025: number;
      epic: {
        summary: string;
      };
      assignee: {
        displayName: string;
      };
      status: {
        name: string;
      };
    };
  }[];
}

export type Sprint = {
  id: number;
  self: string;
  state: 'active' | 'closed' | 'future' | 'unknown';
  name: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  originBoardId: number;
  goal: string;
};
