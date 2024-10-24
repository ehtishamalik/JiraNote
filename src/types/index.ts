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
