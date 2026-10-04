import { useState } from 'react';
import { Button } from './components/Button/Button.tsx';
import { TimePicker } from './components/TimePicker/TimePicker.tsx';
import type { ButtonVariant, ButtonSize } from './components/Button/ButtonProps.ts';
import styles from './App.module.css';

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text'];
const SIZES: ButtonSize[] = ['S', 'M', 'L'];

function App() {
  const [time, setTime] = useState('09:30');

  return (
    <div className={styles.page}>

      <h2 className={styles.heading}>Button</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>variant</th>
            <th>size</th>
            <th>default</th>
            <th>:hover</th>
            <th>:active</th>
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
                <td><Button variant={variant} size={size} disabled>Кнопка</Button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2 className={styles.heading}>TimePicker</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>size</th>
            <th>default</th>
            <th>disabled</th>
          </tr>
        </thead>
        <tbody>
          {SIZES.map(size => (
            <tr key={size}>
              <td className={styles.cellSize}>{size}</td>
              <td><TimePicker size={size} value={time} onChange={setTime} /></td>
              <td><TimePicker size={size} value="12:00" disabled /></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
