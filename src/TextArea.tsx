import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize, readableColor } from 'polished';
import {
  createStyles,
  createReadablePalette,
  PropsFromStyles,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => {
  const bland = createReadablePalette(theme.colors.bland, surface);
  const danger = createReadablePalette(theme.colors.danger, surface);

  return {
    root: css`
      ${theme.fonts.body1};
      padding: ${theme.space(0.75)} ${theme.space(0.5)};
      border: none;
      outline: none;
      appearance: none;
      background: none;
      margin: ${theme.space(0.5)} 0;

      &:disabled {
        cursor: not-allowed;
      }
    `,
    filled: css`
      background-color: ${transparentize(0.8, bland.decorative)};
      color: ${readableColor(surface)};
      transition: background-color ${theme.durations.standard};

      &:focus {
        background-color: ${transparentize(0.92, color.decorative)};
        color: ${readableColor(surface)};
      }
      &:hover {
        background-color: ${transparentize(0.9, color.decorative)};
        color: ${readableColor(surface)};
      }
      &:disabled {
        background-color: ${transparentize(0.9, bland.decorative)};
      }
    `,
    filledHasError: css`
      background-color: ${transparentize(0.9, danger.decorative)};
      color: ${readableColor(surface)};
      &:focus {
        background-color: ${transparentize(0.85, danger.decorative)};
      }
      &:not([disabled]):hover {
        background-color: ${transparentize(0.87, danger.decorative)};
      }
    `,
    outlined: css`
      background-color: ${surface};
      transition: border ${theme.durations.standard},
        background-color ${theme.durations.standard};
      border: 2px solid ${bland.decorative};

      &:focus {
        border: 2px solid ${color.decorative};
        background-color: ${transparentize(0.93, color.decorative)};
      }
      &:hover {
        border: 2px solid ${transparentize(0.3, color.decorative)};
      }
      &:disabled {
        border: 2px solid ${transparentize(0.7, bland.decorative)};
        background-color: ${transparentize(0.9, bland.decorative)};
      }
    `,
    outlinedHasError: css`
      border: 2px solid ${danger.decorative};
      &:focus {
        border: 2px solid ${danger.decorative};
        background-color: ${transparentize(0.93, danger.decorative)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(0.3, danger.decorative)};
      }
    `,
  };
});

type TextAreaProps = JSX.IntrinsicElements['textarea'];
interface Props extends PropsFromStyles<typeof useStyles>, TextAreaProps {
  focused?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
  component?: ReactComponent;
}

const TextArea = forwardRef(
  (props: Props, ref: React.Ref<HTMLTextAreaElement>) => {
    const {
      Root,
      styles,
      variant = 'outlined',
      focused: _focused,
      hasError: incomingHasError,
      disabled: incomingDisabled,
      onFocus,
      onBlur,
      ...restOfProps
    } = useStyles(props, props.component ?? 'textarea');

    const formControlContext = useContext(FormControlContext);

    const id = formControlContext?.id;
    const hasError = incomingHasError ?? formControlContext?.hasError ?? false;
    const disabledFromFormControl = formControlContext?.disabled ?? false;
    const disabled = incomingDisabled || disabledFromFormControl;

    const handleFocus = (e: React.FocusEvent<any>) => {
      if (onFocus) {
        onFocus(e);
      }

      if (formControlContext) {
        formControlContext.setFocused(true);
      }
    };
    const handleBlur = (e: React.FocusEvent<any>) => {
      if (onBlur) {
        onBlur(e);
      }

      if (formControlContext) {
        formControlContext.setFocused(false);
      }
    };

    return (
      <Root
        ref={ref}
        id={id}
        disabled={disabled}
        className={classNames({
          [styles.outlined]: variant === 'outlined',
          [styles.outlinedHasError]: variant === 'outlined' && hasError,
          [styles.filled]: variant === 'filled',
          [styles.filledHasError]: variant === 'filled' && hasError,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restOfProps}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
