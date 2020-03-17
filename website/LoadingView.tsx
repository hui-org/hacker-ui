import React from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles(({ css, theme, staticVar }) => ({
  root: css`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  container: css`
    width: ${theme.breakpoints.mobile};
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${theme.space(1)};
  `,
  title: css`
    ${staticVar(theme.fonts.h4)};
    margin-bottom: ${theme.space(1)};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function LoadingView(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <div className={styles.container}>
        <h3 className={styles.title}>Loading…</h3>
        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
      </div>
    </Root>
  );
}

export default LoadingView;
