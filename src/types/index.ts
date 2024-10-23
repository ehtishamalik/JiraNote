export type SelectOptionValue = string;

export type SelectOption = {
  label: string;
  value: SelectOptionValue;
};

export interface ITicket {
  id: string;
  epic: string;
  points: number;
}

export interface IRecipient {
  id: string;
  recipient: string;
  totalPoints: number;
  tickets: ITicket[];
}
