import { describe, expect, it } from 'vitest';
import {
  addDays, addMonths, formatMonth, getMonthWeeks, isDayDisabled, isMonthOutsideRange,
} from '../src/components/Calendar/calendar-utils';

describe('calendar arithmetic and formatting', () => {
  it('uses locale week starts and never shows adjacent months', () => {
    const november = new Date(2026, 10, 17);
    const ru = getMonthWeeks(november, 1);
    const en = getMonthWeeks(november, 0);
    const ar = getMonthWeeks(november, 6);
    expect(ru).toHaveLength(6);
    expect(ru[0].slice(0, 6)).toEqual(Array(6).fill(null));
    expect(ru[0][6]?.getDate()).toBe(1);
    expect(en).toHaveLength(5);
    expect(en[0][0]?.getDate()).toBe(1);
    expect(ar[0][0]).toBeNull();
    expect(ar[0][1]?.getDate()).toBe(1);
    for (const weeks of [ru, en, ar]) {
      const dates = weeks.flat().filter(date => date !== null);
      expect(dates).toHaveLength(30);
      expect(dates.every(date => date.getMonth() === 10)).toBe(true);
    }
  });

  it('handles leap years, shorter months, and year boundaries', () => {
    expect(addMonths(new Date(2024, 0, 31), 1)).toEqual(new Date(2024, 1, 29));
    expect(addMonths(new Date(2025, 0, 31), 1)).toEqual(new Date(2025, 1, 28));
    expect(addMonths(new Date(2026, 0, 31), -1)).toEqual(new Date(2025, 11, 31));
    expect(addDays(new Date(2026, 11, 31), 1)).toEqual(new Date(2027, 0, 1));
    expect(getMonthWeeks(new Date(2024, 1, 1), 1).flat().filter(Boolean)).toHaveLength(29);
    expect(getMonthWeeks(new Date(2021, 1, 1), 1)).toHaveLength(4);
  });

  it('compares restrictions by local day, including both range endpoints', () => {
    const min = new Date(2026, 10, 10, 23, 59);
    const max = new Date(2026, 10, 20, 0, 1);
    expect(isDayDisabled(new Date(2026, 10, 10), min, max)).toBe(false);
    expect(isDayDisabled(new Date(2026, 10, 20, 23), min, max)).toBe(false);
    expect(isDayDisabled(new Date(2026, 10, 9), min, max)).toBe(true);
    expect(isDayDisabled(new Date(2026, 10, 21), min, max)).toBe(true);
    expect(isMonthOutsideRange(new Date(2026, 9, 1), min, max)).toBe(true);
    expect(isMonthOutsideRange(new Date(2026, 10, 1), min, max)).toBe(false);
  });

  it('capitalizes localized headings and removes the Russian year suffix', () => {
    const date = new Date(2026, 10, 1);
    expect(formatMonth(date, 'ru-RU')).toBe('Ноябрь 2026');
    expect(formatMonth(date, 'en-US')).toBe('November 2026');
    expect(formatMonth(date, 'ar-EG')).toBe('نوفمبر ٢٠٢٦');
  });
});
