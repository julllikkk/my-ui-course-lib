import { Button } from './components/Button';
import type { ButtonVariant, ButtonSize } from './components/ButtonProps';
import styles from './App.module.css';

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text'];
const SIZES: ButtonSize[] = ['S', 'M', 'L'];

function App() {
  return (
    <div className={styles.page}>
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
    </div>
  );
}

export default App;
