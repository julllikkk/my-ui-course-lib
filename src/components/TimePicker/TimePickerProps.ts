export type TimePickerSize = 'S' | 'M' | 'L';

export interface TimePickerProps {
  value?: string; // "HH:MM"
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: TimePickerSize;
}
