import { useId, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useLocale } from '../../locale.ts';
import { Button } from '../Button/Button.tsx';
import { CalendarIcon, ChevronIcon } from './CalendarIcons.tsx';
import type { CalendarProps } from './Calendar.types.ts';
import {
  addDays, addMonths, clampMonth, formatMonth, getMonthWeeks, isDayDisabled,
  isMonthOutsideRange, isSameDay, isSameMonth, startOfDay, startOfMonth,
} from './calendar-utils.ts';
import * as s from './Calendar.css.ts';

export type { CalendarProps } from './Calendar.types.ts';

export function Calendar({
  value, onValueChange, month, onMonthChange, minDate, maxDate, isDateDisabled, autoFocus = false,
}: CalendarProps) {
  const { locale, dir, firstDayOfWeek, weekend, messages } = useLocale();
  const titleId = useId();
  const [internalMonth, setInternalMonth] = useState(() => clampMonth(month ?? value ?? new Date(), minDate, maxDate));
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const buttons = useRef(new Map<number, HTMLButtonElement>());
  const focusRequest = useRef<number | null>(null);
  const hasAutoFocused = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleMonth = startOfMonth(month ?? internalMonth);
  const previousMonth = clampMonth(addMonths(visibleMonth, -1), minDate, maxDate);
  const nextMonth = clampMonth(addMonths(visibleMonth, 1), minDate, maxDate);
  const today = startOfDay(new Date());
  const footerDate = value ?? today;
  const weeks = getMonthWeeks(visibleMonth, firstDayOfWeek);
  const dates = weeks.flat().filter((date): date is Date => date !== null);
  const disabled = (date: Date) => isDayDisabled(date, minDate, maxDate, isDateDisabled);
  const firstEnabled = dates.find(date => !disabled(date));
  const preferredDate = focusedDate && isSameMonth(focusedDate, visibleMonth)
    ? focusedDate
    : [value, today].find(date => date !== null && isSameMonth(date, visibleMonth) && !disabled(date));
  const tabDate = firstEnabled ? (preferredDate ?? firstEnabled) : undefined;
  const dateFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  const fullDateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: dir === 'rtl' ? 'narrow' : 'short' });
  const fullWeekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  const numberFormatter = new Intl.NumberFormat(locale, { useGrouping: false });

  useLayoutEffect(() => {
    if (focusRequest.current !== null) {
      const button = buttons.current.get(focusRequest.current);
      if (button) {
        button.focus();
        focusRequest.current = null;
      }
    }
    if (autoFocus && !hasAutoFocused.current) {
      hasAutoFocused.current = true;
      const button = tabDate && buttons.current.get(tabDate.getTime());
      (button || gridRef.current)?.focus();
    }
  });

  function changeMonth(next: Date) {
    const normalized = clampMonth(next, minDate, maxDate);
    if (isSameMonth(normalized, visibleMonth) || isMonthOutsideRange(normalized, minDate, maxDate)) return;
    if (month === undefined) setInternalMonth(normalized);
    onMonthChange?.(new Date(normalized));
  }

  function selectDate(date: Date) {
    if (disabled(date)) return;
    setFocusedDate(startOfDay(date));
    onValueChange(startOfDay(date));
  }

  function handleDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    let target: Date;
    const weekOffset = (date.getDay() - firstDayOfWeek + 7) % 7;
    switch (event.key) {
      case 'ArrowLeft': target = addDays(date, dir === 'rtl' ? 1 : -1); break;
      case 'ArrowRight': target = addDays(date, dir === 'rtl' ? -1 : 1); break;
      case 'ArrowUp': target = addDays(date, -7); break;
      case 'ArrowDown': target = addDays(date, 7); break;
      case 'Home': target = addDays(date, -weekOffset); break;
      case 'End': target = addDays(date, 6 - weekOffset); break;
      case 'PageUp': target = addMonths(date, event.shiftKey ? -12 : -1); break;
      case 'PageDown': target = addMonths(date, event.shiftKey ? 12 : 1); break;
      default: return;
    }
    event.preventDefault();
    if (isMonthOutsideRange(target, minDate, maxDate)) return;

    setFocusedDate(target);
    focusRequest.current = target.getTime();
    if (isSameMonth(target, visibleMonth)) {
      buttons.current.get(target.getTime())?.focus();
      focusRequest.current = null;
    } else {
      changeMonth(target);
    }
  }

  function selectToday() {
    if (disabled(today)) return;
    focusRequest.current = today.getTime();
    changeMonth(today);
    selectDate(today);
  }

  return (
    <section className={s.root} dir={dir} lang={locale} aria-labelledby={titleId}>
      <header className={s.header}>
        <Button variant="outline" size="S" className={s.navigation}
          aria-label={messages.calendar.prevMonth}
          disabled={previousMonth >= visibleMonth || isMonthOutsideRange(previousMonth, minDate, maxDate)}
          onClick={() => changeMonth(previousMonth)}>
          <ChevronIcon />
        </Button>
        <h2 id={titleId} className={s.title} aria-live="polite" aria-atomic="true">
          {formatMonth(visibleMonth, locale)}
        </h2>
        <Button variant="outline" size="S" className={s.navigation}
          aria-label={messages.calendar.nextMonth}
          disabled={nextMonth <= visibleMonth || isMonthOutsideRange(nextMonth, minDate, maxDate)}
          onClick={() => changeMonth(nextMonth)}>
          <ChevronIcon next />
        </Button>
      </header>

      <div ref={gridRef} role="grid" aria-labelledby={titleId} className={s.grid}
        tabIndex={firstEnabled ? -1 : 0}>
        <div role="row" className={s.week}>
          {Array.from({ length: 7 }, (_, index) => {
            const weekday = addDays(new Date(2026, 10, 1), (firstDayOfWeek + index) % 7);
            return (
              <div key={index} role="columnheader" className={s.weekday} aria-label={fullWeekdayFormatter.format(weekday)}>
                {weekdayFormatter.format(weekday)}
              </div>
            );
          })}
        </div>
        {weeks.map((week, row) => (
          <div key={row} role="row" className={s.week}>
            {week.map((date, column) => (
              <div key={column} role="gridcell" className={s.cell}
                aria-selected={date ? isSameDay(value, date) : undefined}>
                {date && (
                  <Button variant="text" size="S" className={s.day}
                    ref={element => {
                      if (element) buttons.current.set(date.getTime(), element);
                      else buttons.current.delete(date.getTime());
                    }}
                    aria-label={fullDateFormatter.format(date)}
                    aria-current={isSameDay(today, date) ? 'date' : undefined}
                    aria-disabled={disabled(date) || undefined}
                    tabIndex={isSameDay(tabDate ?? null, date) ? 0 : -1}
                    data-weekend={weekend.includes(date.getDay()) || undefined}
                    data-selected={isSameDay(value, date) || undefined}
                    data-today={isSameDay(today, date) || undefined}
                    onFocus={() => setFocusedDate(date)}
                    onKeyDown={event => handleDayKeyDown(event, date)}
                    onClick={() => selectDate(date)}>
                    {numberFormatter.format(date.getDate())}
                  </Button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <footer className={s.footer}>
        <span className={s.selectedDate} aria-live="polite" aria-atomic="true">
          <time dateTime={`${footerDate.getFullYear()}-${String(footerDate.getMonth() + 1).padStart(2, '0')}-${String(footerDate.getDate()).padStart(2, '0')}`}>
            {dateFormatter.format(footerDate)}
          </time>
        </span>
        <Button variant="outline" size="S" icon={<CalendarIcon />} className={s.todayButton}
          disabled={disabled(today)} onClick={selectToday}>
          {messages.calendar.today}
        </Button>
      </footer>
    </section>
  );
}
