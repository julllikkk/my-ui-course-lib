import { Tag } from './components/Tag';
import type { TagVariant, TagSize } from './components/TagProps';
import styles from './App.module.css';

const VARIANTS: TagVariant[] = ['fill', 'outline', 'text'];
const SIZES: TagSize[] = ['S', 'M', 'L'];

function App() {
  return (
    <div className={styles.page}>
      <h2 className={styles.sectionTitle}>as="button"</h2>
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
                <td><Tag variant={variant} size={size}>Кнопка</Tag></td>
                <td><Tag variant={variant} size={size} data-state="hover">Кнопка</Tag></td>
                <td><Tag variant={variant} size={size} data-state="active">Кнопка</Tag></td>
                <td><Tag variant={variant} size={size} disabled>Кнопка</Tag></td>
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
            <th>disabled</th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map(variant =>
            SIZES.map(size => (
              <tr key={variant + size}>
                <td className={styles.cellVariant}>{variant}</td>
                <td className={styles.cellSize}>{size}</td>
                <td><Tag as="a" href="#" variant={variant} size={size}>Ссылка</Tag></td>
                <td><Tag as="a" href="#" variant={variant} size={size} data-state="hover">Ссылка</Tag></td>
                <td><Tag as="a" href="#" variant={variant} size={size} data-state="active">Ссылка</Tag></td>
                <td><Tag as="a" href="#" variant={variant} size={size} disabled>Ссылка</Tag></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
