import React, { forwardRef } from 'react';
import {
  createStyles,
  PropsFromStyles,
  transparentize,
} from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    color: ${color.readable};
    text-decoration: underline;
    transition: color ${theme.duration.standard};

    &:active {
      color: ${transparentize(color.readable, 0.5)};
    }
  `,
}));

type AnchorProps = JSX.IntrinsicElements['a'];
interface Props extends PropsFromStyles<typeof useStyles>, AnchorProps {
  component?: ReactComponent;
}

const Anchor = forwardRef((props: Props, ref: React.Ref<HTMLAnchorElement>) => {
  const { Root, styles, component, ...restOfProps } = useStyles(
    props,
    props.component ?? 'a',
  );

  return <Root ref={ref} {...restOfProps} />;
});

Anchor.displayName = 'Anchor';

export default Anchor;
