import { ButtonProps } from './types';
import IconPlus from '/icon-plus.svg';
import IconExport from '/icon-export.svg';

export const Button = ({
  text,
  icon,
  size = 'medium',
  onClickCallback,
}: ButtonProps) => {
  let buttonIcon = '';
  switch (icon) {
    case 'plus':
      buttonIcon = IconPlus;
      break;
    case 'export':
      buttonIcon = IconExport;
      break;
  }

  return (
    <button
      type="button"
      className={`jn-button jn-button__${size}`}
      onClick={() => onClickCallback()}
    >
      {buttonIcon && (
        <span className="jn-button__icon">
          <img src={buttonIcon} alt="button icon" />
        </span>
      )}
      <span className="jn-button__text">{text}</span>
    </button>
  );
};
