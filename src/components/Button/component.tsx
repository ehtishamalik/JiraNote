import { ButtonProps } from './types';
import IconPlus from '/icon-plus.svg';
import IconExport from '/icon-export.svg';
import IconLoader from '/loader.svg';
import clsx from 'clsx';

export const Button = ({
  text,
  icon,
  isLoading,
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

  buttonIcon = isLoading ? IconLoader : buttonIcon;

  return (
    <button
      type="button"
      disabled={isLoading}
      className={clsx('jn-button', `jn-button__${size}`, {
        'jn-button__loading': isLoading,
      })}
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
