export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function startOfMonth(date: Date): Date {
  const result = startOfDay(date);
  result.setDate(1);
  return result;
}

export function addDays(date: Date, amount: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function addMonths(date: Date, amount: number): Date {
  const result = startOfMonth(date);
  result.setMonth(result.getMonth() + amount);
  const lastDay = addDays(addMonthsStart(result, 1), -1).getDate();
  result.setDate(Math.min(date.getDate(), lastDay));
  return result;
}

function addMonthsStart(date: Date, amount: number): Date {
  const result = startOfMonth(date);
  result.setMonth(result.getMonth() + amount);
  return result;
}

export function isSameDay(a: Date | null, b: Date): boolean {
  return a !== null && startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function getMonthWeeks(month: Date, firstDayOfWeek: number): (Date | null)[][] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
  const count = addDays(addMonthsStart(first, 1), -1).getDate();
  const cells = Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, index) => {
    const day = index - offset + 1;
    return day > 0 && day <= count ? addDays(first, day - 1) : null;
  });
  return Array.from({ length: cells.length / 7 }, (_, row) => cells.slice(row * 7, row * 7 + 7));
}

export function isDayDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  predicate?: (date: Date) => boolean,
): boolean {
  const day = startOfDay(date).getTime();
  return (minDate !== undefined && day < startOfDay(minDate).getTime())
    || (maxDate !== undefined && day > startOfDay(maxDate).getTime())
    || (predicate?.(new Date(date)) ?? false);
}

export function isMonthOutsideRange(month: Date, minDate?: Date, maxDate?: Date): boolean {
  const first = startOfMonth(month);
  const last = addDays(addMonthsStart(first, 1), -1);
  return (minDate !== undefined && last < startOfDay(minDate))
    || (maxDate !== undefined && first > startOfDay(maxDate));
}

export function clampMonth(month: Date, minDate?: Date, maxDate?: Date): Date {
  const first = startOfMonth(month);
  if (minDate && first < startOfMonth(minDate)) return startOfMonth(minDate);
  if (maxDate && first > startOfMonth(maxDate)) return startOfMonth(maxDate);
  return first;
}

export function formatMonth(month: Date, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const parts = formatter.formatToParts(month);
  const yearIndex = parts.findIndex(part => part.type === 'year');
  const label = parts.filter((part, index) => !(index > yearIndex && part.type === 'literal')).map(part => part.value).join('');
  return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
}
