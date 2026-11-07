import { useContext, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from '../src/components/Calendar/Calendar';
import type { CalendarProps } from '../src/components/Calendar/Calendar';
import { LocaleContext, arEG, enUS, ruRU } from '../src/locale';
import { ThemeProvider, ThemeContext as ThemeTokens } from '../src/Theme/ThemeContext';
import { ThemeContext } from '../src/Theme/theme-context';
import { vars } from '../src/Theme/theme.css';

afterEach(cleanup);

const november = new Date(2026, 10, 1);
function englishCalendar(props: Partial<CalendarProps> = {}) {
  return <LocaleContext.Provider value={enUS}>
    <Calendar value={null} onValueChange={() => {}} month={november} {...props} />
  </LocaleContext.Provider>;
}

function day(number: number) {
  return screen.getByRole('button', { name: new RegExp(`November ${number}, 2026$`) });
}

describe('Calendar', () => {
  it('keeps controlled selection unchanged while requesting another month', async () => {
    const onValueChange = vi.fn();
    const onMonthChange = vi.fn();
    render(englishCalendar({ value: new Date(2026, 10, 17), onValueChange, onMonthChange }));
    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 11, 1));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('heading').textContent).toBe('November 2026');
    expect(day(17).closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true');
  });

  it('selects a day and displays the controlled value in the footer', async () => {
    function Controlled() {
      const [value, setValue] = useState<Date | null>(null);
      return englishCalendar({ value, onValueChange: setValue });
    }
    render(<Controlled />);
    await userEvent.click(day(17));
    expect(day(17).getAttribute('data-selected')).toBe('true');
    expect(screen.getByText('Nov 17, 2026').tagName).toBe('TIME');
  });

  it('navigates an uncontrolled month without selecting a date', async () => {
    const onValueChange = vi.fn();
    render(englishCalendar({ value: new Date(2026, 10, 17), month: undefined, onValueChange }));
    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('heading').textContent).toBe('December 2026');
    expect(screen.getByText('Nov 17, 2026')).toBeTruthy();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('blocks out-of-range dates and custom disabled days for pointer and keyboard', async () => {
    const onValueChange = vi.fn();
    render(englishCalendar({
      minDate: new Date(2026, 10, 10, 23), maxDate: new Date(2026, 10, 20),
      isDateDisabled: date => date.getDate() === 17, onValueChange,
    }));
    for (const number of [9, 17, 21]) {
      const button = day(number);
      expect(button.getAttribute('aria-disabled')).toBe('true');
      await userEvent.click(button);
      button.focus();
      await userEvent.keyboard('{Enter} ');
    }
    expect(onValueChange).not.toHaveBeenCalled();
    await userEvent.click(day(10));
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 10, 10));
    expect((screen.getByRole('button', { name: 'Previous month' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Next month' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('moves focus with arrows and selects using Enter and Space', async () => {
    const onValueChange = vi.fn();
    render(englishCalendar({ value: new Date(2026, 10, 17), autoFocus: true, onValueChange }));
    expect(document.activeElement).toBe(day(17));
    await userEvent.keyboard('{ArrowRight}{ArrowDown}');
    expect(document.activeElement).toBe(day(25));
    expect(onValueChange).not.toHaveBeenCalled();
    await userEvent.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2026, 10, 25));
    await userEvent.keyboard('{Home}');
    expect(document.activeElement).toBe(day(22));
    await userEvent.keyboard(' ');
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2026, 10, 22));
    await userEvent.keyboard('{End}');
    expect(document.activeElement).toBe(day(28));
  });

  it('preserves focus across controlled month transitions and shorter months', async () => {
    function Controlled() {
      const [month, setMonth] = useState(new Date(2024, 0, 1));
      return <Calendar value={new Date(2024, 0, 31)} onValueChange={() => {}}
        month={month} onMonthChange={setMonth} autoFocus />;
    }
    render(<Controlled />);
    await userEvent.keyboard('{PageDown}');
    expect(screen.getByRole('heading').textContent).toBe('Февраль 2024');
    expect(document.activeElement?.textContent).toBe('29');
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('heading').textContent).toBe('Март 2024');
    expect(document.activeElement?.textContent).toBe('1');
  });

  it('uses Arabic digits, Saturday as the first weekday, and mirrored keyboard arrows', async () => {
    render(<LocaleContext.Provider value={arEG}>
      <Calendar value={new Date(2026, 10, 17)} onValueChange={() => {}} month={november} autoFocus />
    </LocaleContext.Provider>);
    expect(screen.getByRole('region').getAttribute('dir')).toBe('rtl');
    expect(screen.getByRole('heading').textContent).toBe('نوفمبر ٢٠٢٦');
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0].getAttribute('aria-label')).toBe('السبت');
    expect(headers.every(header => Array.from(header.textContent ?? '').length === 1)).toBe(true);
    expect(document.activeElement?.textContent).toBe('١٧');
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement?.textContent).toBe('١٨');
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement?.textContent).toBe('١٧');
    const friday = screen.getByRole('button', { name: new Intl.DateTimeFormat('ar-EG', { dateStyle: 'full' }).format(new Date(2026, 10, 20)) });
    expect(friday.getAttribute('data-weekend')).toBe('true');
  });

  it('updates texts, week starts, and weekends when locale changes', () => {
    const { rerender } = render(englishCalendar());
    expect(screen.getAllByRole('columnheader')[0].getAttribute('aria-label')).toBe('Sunday');
    rerender(<LocaleContext.Provider value={ruRU}><Calendar value={null} onValueChange={() => {}} month={november} /></LocaleContext.Provider>);
    expect(screen.getAllByRole('columnheader')[0].getAttribute('aria-label')).toBe('понедельник');
    expect(screen.getByRole('button', { name: 'Сегодня' })).toBeTruthy();
    expect(screen.getAllByRole('gridcell')).toHaveLength(42);
    expect(screen.getAllByRole('gridcell').filter(cell => within(cell).queryByRole('button'))).toHaveLength(30);
  });

  it('Today selects the local day and requests its month', async () => {
    const onValueChange = vi.fn();
    const onMonthChange = vi.fn();
    const now = new Date();
    render(englishCalendar({ month: new Date(now.getFullYear(), now.getMonth() - 1, 1), onValueChange, onMonthChange }));
    await userEvent.click(screen.getByRole('button', { name: 'Today' }));
    expect(onValueChange).toHaveBeenCalledWith(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(now.getFullYear(), now.getMonth(), 1));
  });

  it('disables Today when its date is unavailable', () => {
    const onValueChange = vi.fn();
    render(englishCalendar({ isDateDisabled: () => true, onValueChange, autoFocus: true }));
    const today = screen.getByRole('button', { name: 'Today' }) as HTMLButtonElement;
    expect(today.disabled).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('grid'));
    fireEvent.click(today);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('can return to the allowed range after restrictions change', async () => {
    const onMonthChange = vi.fn();
    const { rerender } = render(englishCalendar({ onMonthChange }));
    rerender(englishCalendar({ minDate: new Date(2027, 1, 10), onMonthChange }));
    expect((screen.getByRole('button', { name: 'Previous month' }) as HTMLButtonElement).disabled).toBe(true);
    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2027, 1, 1));
  });

  it('keeps one tab stop when keyboard focus moves to a disabled day', async () => {
    render(englishCalendar({ value: new Date(2026, 10, 16), autoFocus: true,
      isDateDisabled: date => date.getDate() === 17 }));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(day(17));
    expect(day(17).tabIndex).toBe(0);
    const tabStops = screen.getAllByRole('gridcell').flatMap(cell => within(cell).queryAllByRole('button'))
      .filter(button => button.tabIndex === 0);
    expect(tabStops).toHaveLength(1);
  });

  it('provides nested themes while preserving token overrides', () => {
    function ReadTheme() { return <output>{useContext(ThemeContext)}</output>; }
    const { container } = render(<ThemeProvider theme="dark">
      <ReadTheme />
      <ThemeProvider theme="light"><ReadTheme /></ThemeProvider>
      <ThemeTokens tokens={{ calendarPadding: '24px' }}>{englishCalendar()}</ThemeTokens>
    </ThemeProvider>);
    expect(screen.getAllByRole('status').map(output => output.textContent)).toEqual(['dark', 'light']);
    expect(container.querySelector('[data-theme="dark"] [data-theme="light"]')).toBeTruthy();
    const tokenProvider = screen.getByRole('region').parentElement;
    expect(tokenProvider?.style.getPropertyValue(vars.calendarPadding.slice(4, -1))).toBe('24px');
  });
});
