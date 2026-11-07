import type { ButtonHTMLAttributes, AnchorHTMLAttributes, Ref, ReactNode } from 'react';
import { buttonVariants, buttonSizes, withIcon, iconSlot } from './Button.css.ts';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';

type Base = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export type ButtonProps =
  | (Base & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; ref?: Ref<HTMLButtonElement> })
  | (Base & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; disabled?: boolean; ref?: Ref<HTMLAnchorElement> });

export function Button(props: ButtonProps) {
  const { variant = 'fill', size = 'M', className, icon } = props;

  const cls = [buttonVariants[variant], buttonSizes[size], icon && withIcon, className]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, className: _c, icon: _i, children, disabled, onClick, ...rest } = props;
    return (
      <a
        className={cls}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {icon && <span className={iconSlot} aria-hidden="true">{icon}</span>}
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, icon: _i, children, ...rest } = props;
  return (
    <button type="button" className={cls} {...rest}>
      {icon && <span className={iconSlot} aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
