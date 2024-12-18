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
