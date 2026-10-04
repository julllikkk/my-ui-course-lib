import type { ButtonProps } from './ButtonProps';
import styles from './Button.module.css';

export function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  const cls = [
    styles.button,
    styles[variant],
    styles[size.toLowerCase()],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
