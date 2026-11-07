import { icon, chevron } from './Calendar.css.ts';

export function ChevronIcon({ next = false }: { next?: boolean }) {
  return (
    <svg className={`${icon} ${chevron}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={next ? 'm9 5 8 7-8 7' : 'm15 5-8 7 8 7'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M7 3v4m10-4v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
