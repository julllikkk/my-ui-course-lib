import type { CSSProperties, ReactNode } from 'react';
import { vars } from './theme.css.ts';

export type Tokens = Partial<{
  [K in keyof typeof vars]: string;
}>;

interface ThemeContextProps {
  tokens?: Tokens;
  children: ReactNode;
}

export function ThemeContext({ tokens, children }: ThemeContextProps) {
  if (!tokens) return <>{children}</>;

  const style = Object.fromEntries(
    Object.entries(tokens)
      .filter((entry): entry is [string, string] => entry[1] !== undefined)
      .map(([key, value]) => {
        const varRef = vars[key as keyof typeof vars];
        return [varRef.slice(4, -1), value];
      })
  );

  return <div style={style as CSSProperties}>{children}</div>;
}
