export type ButtonProps = {
  text: string;
  isLoading?: boolean;
  icon?: 'plus' | 'export';
  size?: 'small' | 'medium' | 'large';
  onClickCallback: () => void;
};
