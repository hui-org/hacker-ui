import React, { forwardRef, useState, useEffect } from 'react';
import { transparentize } from 'polished';
import { createPortal } from 'react-dom';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    background-color: ${theme.colors.surface};
    box-shadow: ${theme.shadows.standard};
    width: ${theme.block(3)};
    max-width: 100%;
    height: 100%;
    z-index: ${theme.zIndex.drawer};
  `,
  container: css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
  `,
  backdrop: css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${transparentize(0.5, 'black')};
    z-index: ${theme.zIndex.drawer};
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  open: boolean;
  onClose: () => void;
  component?: ReactComponent;
}

const Drawer = forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
  const {
    Root,
    styles,
    component: _component,
    open,
    onClose,
    ...restOfProps
  } = useStyles(props, props.component ?? 'div');
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // TODO: animations would be a nice-to-have
  useEffect(() => {
    if (!open) return;

    const container = document.createElement('div');
    container.classList.add(styles.container);

    document.body.appendChild(container);
    setContainer(container);

    return () => {
      document.body.removeChild(container);
      setContainer(null);
    };
  }, [open, styles.container]);

  // TODO: SSR/SEO audit
  return (
    container &&
    createPortal(
      <>
        <div className={styles.backdrop} onClick={onClose} />
        <Root ref={ref} {...restOfProps} />
      </>,
      container,
    )
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;