import { IRecipient } from '../../types';

export type FooterProps = {
  getCallback: (recipients: IRecipient[]) => void;
  exportCallback: () => void;
  viewCallback: () => void;
  addAnotherCallback: () => void;
};
