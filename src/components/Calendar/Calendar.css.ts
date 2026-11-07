import { style } from '@vanilla-extract/css';
import { vars } from '../../Theme/theme.css.ts';

export const root = style({
  boxSizing: 'border-box',
  width: vars.calendarWidth,
  maxWidth: '100%',
  paddingBlock: vars.calendarPadding,
  paddingInline: vars.calendarPadding,
  background: vars.calendarBg,
  color: vars.calendarColor,
  border: `${vars.calendarBorderWidth} solid ${vars.calendarBorderColor}`,
  borderRadius: vars.calendarRadius,
  fontFamily: vars.calendarFontFamily,
  selectors: {
    '&:lang(ar)': { fontFamily: vars.calendarArabicFontFamily },
  },
  fontSize: vars.calendarFontSize,
  fontWeight: vars.calendarFontWeight,
  lineHeight: vars.calendarLineHeight,
  vars: {
    [vars.buttonSmallHeight]: vars.calendarDaySize,
    [vars.buttonSmallPaddingX]: '0px',
    [vars.buttonSmallPaddingY]: '0px',
    [vars.buttonSmallFontSize]: vars.calendarFontSize,
    [vars.buttonFocusRingColor]: vars.calendarFocusColor,
    [vars.buttonFocusRingWidth]: vars.calendarFocusWidth,
    [vars.buttonFocusRingOffset]: vars.calendarFocusOffset,
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.calendarHeaderGap,
  marginBlockEnd: vars.calendarSectionGap,
});

export const title = style({
  margin: 0,
  fontSize: vars.calendarTitleFontSize,
  fontWeight: vars.calendarEmphasisWeight,
  textAlign: 'center',
});

export const navigation = style({
  minWidth: 0,
  width: vars.calendarNavSize,
  height: vars.calendarNavSize,
  vars: {
    [vars.buttonSmallHeight]: vars.calendarNavSize,
  },
  flexShrink: 0,
  borderRadius: vars.calendarNavRadius,
});

export const icon = style({
  width: vars.calendarIconSize,
  height: vars.calendarIconSize,
  strokeWidth: vars.calendarIconStroke,
});

export const chevron = style({
  selectors: { '&:dir(rtl)': { transform: 'scaleX(-1)' } },
});

export const grid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.calendarGridGap,
  outline: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `${vars.calendarFocusWidth} solid ${vars.calendarFocusColor}`,
      outlineOffset: vars.calendarFocusOffset,
    },
  },
});

export const week = style({
  display: 'grid',
  gridTemplateColumns: `repeat(7, minmax(${vars.calendarDaySize}, 1fr))`,
  justifyItems: 'center',
});

export const weekday = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: vars.calendarDaySize,
  color: vars.calendarWeekdayColor,
  fontSize: vars.calendarWeekdayFontSize,
});

export const cell = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  minWidth: 0,
});

export const day = style({
  position: 'relative',
  width: vars.calendarDaySize,
  minWidth: vars.calendarDaySize,
  flexShrink: 0,
  height: vars.calendarDaySize,
  borderRadius: vars.calendarDayRadius,
  fontWeight: vars.calendarFontWeight,
  vars: {
    [vars.buttonTextColor]: vars.calendarColor,
    [vars.buttonTextHoverColor]: vars.calendarColor,
    [vars.buttonTextActiveColor]: vars.calendarColor,
    [vars.buttonTextHoverBg]: vars.calendarHoverBg,
    [vars.buttonTextActiveBg]: vars.calendarActiveBg,
    [vars.buttonTextDisabledColor]: vars.calendarDisabledColor,
    [vars.buttonDisabledOpacity]: '1',
  },
  selectors: {
    '&[data-weekend="true"]': {
      vars: {
        [vars.buttonTextColor]: vars.calendarMutedColor,
        [vars.buttonTextHoverColor]: vars.calendarMutedColor,
        [vars.buttonTextActiveColor]: vars.calendarMutedColor,
      },
    },
    '&[data-today="true"]': { fontWeight: vars.calendarEmphasisWeight },
    '&[data-today="true"]::after': {
      content: '""',
      position: 'absolute',
      bottom: vars.calendarDotOffset,
      width: vars.calendarDotSize,
      height: vars.calendarDotSize,
      borderRadius: '50%',
      background: 'currentColor',
    },
    '&[data-selected="true"]': {
      fontWeight: vars.calendarEmphasisWeight,
      vars: {
        [vars.buttonTextBg]: vars.calendarSelectedBg,
        [vars.buttonTextColor]: vars.calendarSelectedColor,
        [vars.buttonTextHoverBg]: vars.calendarSelectedHoverBg,
        [vars.buttonTextHoverColor]: vars.calendarSelectedColor,
        [vars.buttonTextActiveBg]: vars.calendarSelectedBg,
        [vars.buttonTextActiveColor]: vars.calendarSelectedColor,
        [vars.buttonTextDisabledBg]: vars.calendarSelectedBg,
      },
    },
  },
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.calendarHeaderGap,
  marginBlockStart: vars.calendarSectionGap,
  paddingBlockStart: vars.calendarHeaderGap,
  borderBlockStart: `${vars.calendarBorderWidth} solid ${vars.calendarBorderColor}`,
});

export const selectedDate = style({
  color: vars.calendarMutedColor,
  fontSize: vars.calendarSelectedDateFontSize,
});

export const todayButton = style({
  minWidth: 0,
  width: vars.calendarTodayWidth,
  height: vars.calendarTodayHeight,
  flexShrink: 0,
  vars: {
    [vars.buttonSmallHeight]: vars.calendarTodayHeight,
    [vars.buttonSmallPaddingY]: vars.calendarTodayPaddingY,
    [vars.buttonSmallFontSize]: vars.calendarTodayFontSize,
  },
});
