import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size: ButtonSize;
}
