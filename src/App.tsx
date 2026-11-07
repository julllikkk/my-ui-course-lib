import { Button } from './components/Button/Button.tsx';
import type { ButtonVariant, ButtonSize } from './components/Button/Button.tsx';
import { ThemeContext } from './Theme/ThemeContext.tsx';
import styles from './App.module.css';
import { CalendarDemo } from './CalendarDemo';

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text'];
const SIZES: ButtonSize[] = ['S', 'M', 'L'];

export default function App() {
  return (
    <div className={styles.page}>
      <CalendarDemo />
      <details className={styles.previousExamples}>
        <summary>Предыдущая домашняя работа: Button и токены</summary>
      <h2 className={styles.sectionTitle}>ThemeContext demo</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>

        <Button>Обычная кнопка без кастомизаций</Button>

        <ThemeContext tokens={{ buttonSmallPaddingX: '32px', buttonSmallPaddingY: '12px', buttonBorderRadius: '20px' }}>
          <Button size="S">Большие отступы + скругление</Button>
        </ThemeContext>

        <ThemeContext
          tokens={{
            buttonFillBg: '#6B46C1',
            buttonFillHoverBg: '#553C9A',
            buttonFillActiveBg: '#44337A',
            buttonFillDisabledBg: '#6B46C1',
            buttonFocusRingColor: '#6B46C1',
          }}
        >
          <Button>Фиолетовая кнопка</Button>
        </ThemeContext>

        <ThemeContext
          tokens={{
            buttonOutlineColor: '#E53E3E',
            buttonOutlineBorderColor: '#E53E3E',
            buttonOutlineHoverBg: '#FFF5F5',
            buttonOutlineHoverColor: '#C53030',
            buttonOutlineHoverBorderColor: '#C53030',
            buttonOutlineActiveBg: '#FED7D7',
            buttonOutlineActiveColor: '#9B2C2C',
            buttonOutlineActiveBorderColor: '#9B2C2C',
            buttonFocusRingColor: '#E53E3E',
          }}
        >
          <Button variant="outline">Красный outline</Button>
        </ThemeContext>

      </div>

      <h2 className={styles.sectionTitle}>as="button"</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>variant</th>
            <th>size</th>
            <th>default</th>
            <th>:hover</th>
            <th>:active</th>
            <th>:focus-visible</th>
            <th>disabled</th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map(variant =>
            SIZES.map(size => (
              <tr key={variant + size}>
                <td className={styles.cellVariant}>{variant}</td>
                <td className={styles.cellSize}>{size}</td>
                <td><Button variant={variant} size={size}>Кнопка</Button></td>
                <td><Button variant={variant} size={size} data-state="hover">Кнопка</Button></td>
                <td><Button variant={variant} size={size} data-state="active">Кнопка</Button></td>
                <td><Button variant={variant} size={size} data-state="focus">Кнопка</Button></td>
                <td><Button variant={variant} size={size} disabled>Кнопка</Button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2 className={styles.sectionTitle}>as="a"</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>variant</th>
            <th>size</th>
            <th>default</th>
            <th>:hover</th>
            <th>:active</th>
            <th>:focus-visible</th>
            <th>disabled</th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map(variant =>
            SIZES.map(size => (
              <tr key={variant + size}>
                <td className={styles.cellVariant}>{variant}</td>
                <td className={styles.cellSize}>{size}</td>
                <td><Button as="a" href="#" variant={variant} size={size}>Ссылка</Button></td>
                <td><Button as="a" href="#" variant={variant} size={size} data-state="hover">Ссылка</Button></td>
                <td><Button as="a" href="#" variant={variant} size={size} data-state="active">Ссылка</Button></td>
                <td><Button as="a" href="#" variant={variant} size={size} data-state="focus">Ссылка</Button></td>
                <td><Button as="a" href="#" variant={variant} size={size} disabled>Ссылка</Button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      </details>
    </div>
  );
}
