import type { CSSProperties, ReactNode } from 'react';
import { vars } from './theme.css.ts';
import { ThemeContext as ThemeValueContext } from './theme-context.ts';
import type { Theme } from './theme-context.ts';

export type Tokens = Partial<{
  [K in keyof typeof vars]: string;
}>;

interface ThemeContextProps {
  tokens?: Tokens;
  children: ReactNode;
}

interface ThemeProviderProps extends ThemeContextProps {
  theme: Theme;
}

export function ThemeProvider({ theme, tokens, children }: ThemeProviderProps) {
  return (
    <ThemeValueContext.Provider value={theme}>
      <div data-theme={theme}>
        <ThemeContext tokens={tokens}>{children}</ThemeContext>
      </div>
    </ThemeValueContext.Provider>
  );
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
