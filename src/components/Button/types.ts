export type ButtonProps = {
  text: string;
  icon?: 'plus' | 'export';
  size?: 'small' | 'medium' | 'large';
  onClickCallback: () => void;
};
