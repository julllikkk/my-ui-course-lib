import { useRef } from 'react';
import type { TimePickerProps } from './TimePickerProps.ts';
import styles from './TimePicker.module.css';
import * as React from "react";

const sizeClass = {
  S: styles.s,
  M: styles.m,
  L: styles.l,
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function TimePicker({ value = '00:00', onChange, disabled, size = 'M' }: TimePickerProps) {
  const [hStr, mStr] = value.split(':');
  const h = Math.min(23, Math.max(0, parseInt(hStr) || 0));
  const m = Math.min(59, Math.max(0, parseInt(mStr) || 0));

  const minutesRef = useRef<HTMLInputElement>(null);

  function setTime(nextH: number, nextM: number) {
    onChange?.(`${pad(nextH)}:${pad(nextM)}`);
  }

  function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) setTime(Math.min(23, Math.max(0, v)), m);
  }

  function handleMinutesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) setTime(h, Math.min(59, Math.max(0, v)));
  }

  function handleHoursKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp') { e.preventDefault(); setTime((h + 1) % 24, m); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setTime((h - 1 + 24) % 24, m); }
    if (e.key === ':') { e.preventDefault(); minutesRef.current?.focus(); minutesRef.current?.select(); }
  }

  function handleMinutesKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp') { e.preventDefault(); setTime(h, (m + 1) % 60); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setTime(h, (m - 1 + 60) % 60); }
  }

  const cls = [
    styles.wrapper,
    sizeClass[size],
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <input
        type="number"
        className={styles.segment}
        value={pad(h)}
        onChange={handleHoursChange}
        onKeyDown={handleHoursKey}
        onFocus={e => e.target.select()}
        disabled={disabled}
        min={0}
        max={23}
      />
      <span className={styles.colon}>:</span>
      <input
        ref={minutesRef}
        type="number"
        className={styles.segment}
        value={pad(m)}
        onChange={handleMinutesChange}
        onKeyDown={handleMinutesKey}
        onFocus={e => e.target.select()}
        disabled={disabled}
        min={0}
        max={59}
      />
    </div>
  );
}
