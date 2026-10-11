import type { ButtonHTMLAttributes, AnchorHTMLAttributes, Ref } from 'react';

export type TagVariant = 'fill' | 'outline' | 'text';
export type TagSize = 'S' | 'M' | 'L';

type Base = {
  variant?: TagVariant;
  size?: TagSize;
};

export type TagProps =
  | (Base & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; ref?: Ref<HTMLButtonElement> })
  | (Base & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; disabled?: boolean; ref?: Ref<HTMLAnchorElement> });
