import { IRecipient, ITicket } from '../types';

export const getTikcet = (): ITicket => {
  return {
    id: Date.now(),
    epic: '',
    points: 0,
  };
};

export const getRecipient = (): IRecipient => {
  return {
    id: Date.now(),
    recipient: '',
    tickets: [getTikcet()],
  };
};
