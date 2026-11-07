export interface CalendarProps {
  value: Date | null;
  onValueChange: (date: Date) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  autoFocus?: boolean;
}
