import { IRecipient } from '../../types';

export type FooterProps = {
  getCallback: (data: IRecipient[]) => void;
  exportCallback: () => void;
  viewCallback: () => void;
  addAnotherCallback: () => void;
};
