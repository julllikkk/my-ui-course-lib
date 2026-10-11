import type { TagProps } from './TagProps.ts';
import styles from './Tag.module.css';

export function Tag(props: TagProps) {
  const { variant = 'fill', size = 'M', className } = props;

  const cls = [
    styles.tag,
    styles[variant],
    styles[size.toLowerCase()],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, className: _c, children, disabled, onClick, ...rest } = props;
    return (
      <a
        className={cls}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children, ...rest } = props;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
