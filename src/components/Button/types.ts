export type ButtonProps = {
  text: string;
  icon?: 'plus' | 'export';
  size?: 'small' | 'medium' | 'large';
  onclickCallback?: () => void;
};
