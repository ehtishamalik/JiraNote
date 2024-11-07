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
  tickets: ITicket[];
}

export interface ContentSummarized {
  points: number;
  epic: string;
  recipient: string;
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
    };
  }[];
}
