import { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar.tsx';
import { Button } from './components/Button/Button.tsx';
import { LocaleContext, ruRU, enUS, arEG } from './locale';
import { ThemeProvider } from './Theme/ThemeContext.tsx';
import styles from './App.module.css';
import * as calendarStyles from './components/Calendar/Calendar.css.ts';

const locales = [ruRU, enUS, arEG];
const themes = ['light', 'dark'] as const;

function fromDateInput(value: string): Date | undefined {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function CalendarDemo() {
  const [date, setDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(() => new Date());
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [disableWeekends, setDisableWeekends] = useState(false);

  return (
    <section className={styles.calendarDemo}>
      <p className={styles.eyebrow}>ДИЗАЙН-СИСТЕМА / КОМПОНЕНТЫ</p>
      <h1 className={styles.demoTitle}>Calendar</h1>
      <div className={styles.controls}>
        <label>От <input type="date" aria-label="Минимальная дата" value={min} max={max || undefined}
          onChange={event => setMin(event.target.value)} /></label>
        <label>До <input type="date" aria-label="Максимальная дата" value={max} min={min || undefined}
          onChange={event => setMax(event.target.value)} /></label>
        <label className={styles.checkboxLabel}><input type="checkbox" checked={disableWeekends}
          onChange={event => setDisableWeekends(event.target.checked)} /> Отключить выходные</label>
        <Button variant="outline" size="S" onClick={() => setDate(null)} disabled={!date}>Сбросить дату</Button>
      </div>
      <p className={styles.demoStatus} role="status">
        {date ? `Выбрано: ${new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(date)}` : 'Дата не выбрана'}
      </p>
      <div className={styles.calendarGallery}>
        {themes.map(theme => locales.map(locale => (
          <div key={`${theme}-${locale.locale}`}>
            <p className={styles.cardLabel}>
              {locale.locale} · {theme === 'light' ? 'Светлая' : 'Тёмная'}{locale.dir === 'rtl' ? ' · RTL' : ''}
            </p>
            <ThemeProvider theme={theme}>
              <LocaleContext.Provider value={locale}>
                <Calendar value={date} onValueChange={setDate} month={month} onMonthChange={setMonth}
                  minDate={fromDateInput(min)} maxDate={fromDateInput(max)}
                  isDateDisabled={disableWeekends ? day => locale.weekend.includes(day.getDay()) : undefined} />
              </LocaleContext.Provider>
            </ThemeProvider>
          </div>
        )))}
      </div>
      <p className={styles.keyboardHint}>Tab — переход к календарю · Стрелки — дни · Home / End — начало и конец недели · Page Up / Down — месяцы · Enter / Пробел — выбрать</p>
      <h2 className={styles.sectionTitle}>Состояния дня</h2>
      <div className={styles.stateGallery}>
        {themes.map(theme => (
          <ThemeProvider key={theme} theme={theme}>
            <div className={`${calendarStyles.root} ${styles.statePanel}`}>
              {[
                { label: 'Обычный', props: {} },
                { label: 'Наведение', props: { 'data-state': 'hover' } },
                { label: 'Нажатие', props: { 'data-state': 'active' } },
                { label: 'Фокус', props: { 'data-state': 'focus' } },
                { label: 'Выбран', props: { 'data-selected': true } },
                { label: 'Сегодня', props: { 'data-today': true } },
                { label: 'Сегодня + выбран', props: { 'data-today': true, 'data-selected': true } },
                { label: 'Недоступен', props: { 'aria-disabled': true as const } },
              ].map(({ label, props }) => (
                <div key={label} className={styles.stateExample}>
                  <span>{label}</span>
                  <Button variant="text" size="S" className={calendarStyles.day} {...props} tabIndex={-1}>17</Button>
                  <Button variant="text" size="S" className={calendarStyles.day} data-weekend {...props} tabIndex={-1}>21</Button>
                </div>
              ))}
            </div>
          </ThemeProvider>
        ))}
      </div>
    </section>
  );
}
