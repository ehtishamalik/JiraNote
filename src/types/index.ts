export type SelectOptionValue = string;

export type SelectOption = {
  label: string;
  value: SelectOptionValue;
};

export interface ITicket {
  id: number;
  epic: string;
  points: number;
}

export interface IRecipient {
  id: number;
  recipient: string;
  tickets: ITicket[];
}
