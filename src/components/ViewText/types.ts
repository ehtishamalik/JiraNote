import { IRecipient } from '../../types';

export type ViewTextProps = {
  showText: boolean;
  recipients: IRecipient[];
  title: string;
  closeCallback: () => void;
};
