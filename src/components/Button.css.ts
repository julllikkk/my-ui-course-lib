import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../theme.css.ts';

type StateColors = {
  backgroundColor: string;
  color: string;
  borderColor: string;
};

function stateSelectors(hover: StateColors, active: StateColors, disabled: StateColors) {
  return {
    '&:hover:not(:disabled):not([aria-disabled="true"]), &[data-state="hover"]:not(:disabled):not([aria-disabled="true"])': hover,
    '&:active:not(:disabled):not([aria-disabled="true"]), &[data-state="active"]:not(:disabled):not([aria-disabled="true"])': active,
    '&:disabled, &[aria-disabled="true"]': disabled,
  };
}

const base = style({
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  cursor: 'pointer',
  borderRadius: vars.buttonBorderRadius,
  letterSpacing: '-0.1px',
  lineHeight: '20px',
  gap: '8px',
  minWidth: '140px',
  textDecoration: 'none',
  outline: 'none',
  selectors: {
    '&:focus-visible, &[data-state="focus"]': {
      outline: `${vars.buttonFocusRingWidth} solid ${vars.buttonFocusRingColor}`,
      outlineOffset: vars.buttonFocusRingOffset,
    },
    '&:disabled, &[aria-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: vars.buttonDisabledOpacity,
    },
  },
});

export const buttonVariants = styleVariants({
  fill: [
    base,
    {
      border: `${vars.buttonFillBorderWidth} solid ${vars.buttonFillBorderColor}`,
      backgroundColor: vars.buttonFillBg,
      color: vars.buttonFillColor,
      selectors: stateSelectors(
        {
          backgroundColor: vars.buttonFillHoverBg,
          color: vars.buttonFillHoverColor,
          borderColor: vars.buttonFillHoverBorderColor,
        },
        {
          backgroundColor: vars.buttonFillActiveBg,
          color: vars.buttonFillActiveColor,
          borderColor: vars.buttonFillActiveBorderColor,
        },
        {
          backgroundColor: vars.buttonFillDisabledBg,
          color: vars.buttonFillDisabledColor,
          borderColor: vars.buttonFillDisabledBorderColor,
        },
      ),
    },
  ],
  outline: [
    base,
    {
      backgroundColor: vars.buttonOutlineBg,
      color: vars.buttonOutlineColor,
      border: `${vars.buttonOutlineBorderWidth} solid ${vars.buttonOutlineBorderColor}`,
      selectors: stateSelectors(
        {
          backgroundColor: vars.buttonOutlineHoverBg,
          color: vars.buttonOutlineHoverColor,
          borderColor: vars.buttonOutlineHoverBorderColor,
        },
        {
          backgroundColor: vars.buttonOutlineActiveBg,
          color: vars.buttonOutlineActiveColor,
          borderColor: vars.buttonOutlineActiveBorderColor,
        },
        {
          backgroundColor: vars.buttonOutlineDisabledBg,
          color: vars.buttonOutlineDisabledColor,
          borderColor: vars.buttonOutlineDisabledBorderColor,
        },
      ),
    },
  ],
  text: [
    base,
    {
      border: `${vars.buttonTextBorderWidth} solid ${vars.buttonTextBorderColor}`,
      backgroundColor: vars.buttonTextBg,
      color: vars.buttonTextColor,
      selectors: stateSelectors(
        {
          backgroundColor: vars.buttonTextHoverBg,
          color: vars.buttonTextHoverColor,
          borderColor: vars.buttonTextHoverBorderColor,
        },
        {
          backgroundColor: vars.buttonTextActiveBg,
          color: vars.buttonTextActiveColor,
          borderColor: vars.buttonTextActiveBorderColor,
        },
        {
          backgroundColor: vars.buttonTextDisabledBg,
          color: vars.buttonTextDisabledColor,
          borderColor: vars.buttonTextDisabledBorderColor,
        },
      ),
    },
  ],
});

export const buttonSizes = styleVariants({
  S: {
    minHeight: vars.buttonSmallHeight,
    paddingTop: vars.buttonSmallPaddingY,
    paddingBottom: vars.buttonSmallPaddingY,
    paddingLeft: vars.buttonSmallPaddingX,
    paddingRight: vars.buttonSmallPaddingX,
    fontSize: vars.buttonSmallFontSize,
  },
  M: {
    minHeight: vars.buttonMediumHeight,
    paddingTop: vars.buttonMediumPaddingY,
    paddingBottom: vars.buttonMediumPaddingY,
    paddingLeft: vars.buttonMediumPaddingX,
    paddingRight: vars.buttonMediumPaddingX,
    fontSize: vars.buttonMediumFontSize,
  },
  L: {
    minHeight: vars.buttonLargeHeight,
    paddingTop: vars.buttonLargePaddingY,
    paddingBottom: vars.buttonLargePaddingY,
    paddingLeft: vars.buttonLargePaddingX,
    paddingRight: vars.buttonLargePaddingX,
    fontSize: vars.buttonLargeFontSize,
  },
});
