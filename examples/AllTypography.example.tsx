import React from 'react';
import { useMediaQuery } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
    }
  `,
  heading1: css`
    ${theme.fonts.h1};
  `,
  heading2: css`
    ${theme.fonts.h2};
  `,
  heading3: css`
    ${theme.fonts.h3};
  `,
  heading4: css`
    ${theme.fonts.h4};
  `,
  heading5: css`
    ${theme.fonts.h5};
  `,
  body1: css`
    ${theme.fonts.body1};
  `,
  body2: css`
    ${theme.fonts.body2};
  `,
  caption: css`
    ${theme.fonts.caption};
  `,
  button: css`
    ${theme.fonts.button};
  `,
  subtitle1: css`
    ${theme.fonts.subtitle1};
  `,
  subtitle2: css`
    ${theme.fonts.subtitle2};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function AllTypographyExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const isMobile = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.tablet),
  );

  return (
    <Root>
      <div className={styles.heading1}>{isMobile ? 'H1' : 'Heading 1'}</div>
      <div className={styles.heading2}>{isMobile ? 'H2' : 'Heading 2'}</div>
      <div className={styles.heading3}>Heading 3</div>
      <div className={styles.heading4}>Heading 4</div>
      <div className={styles.heading5}>Heading 5</div>
      <div className={styles.body1}>
        <strong>body1: Use for normal text.</strong> Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div className={styles.body2}>
        <strong>body2: Use for sub-text.</strong> Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div className={styles.caption}>Caption — use with labels.</div>
      <div className={styles.button}>Button text</div>
      <div className={styles.subtitle1}>Subtitle 1</div>
      <div className={styles.subtitle2}>Subtitle 2</div>
    </Root>
  );
}

export default AllTypographyExample;
