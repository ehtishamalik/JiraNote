import { ButtonProps } from './types';
import IconPlus from '../../assets/icon-plus.svg';
import IconExport from '../../assets/icon-export.svg';
import clsx from 'clsx';

export const Button = ({
  text,
  icon,
  size = 'medium',
  onclickCallback,
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
      className={clsx('jn-button', `jn-button__${size}`)}
      onClick={() => onclickCallback?.()}
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
