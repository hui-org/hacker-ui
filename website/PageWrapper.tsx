import React from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { transparentize } from 'polished';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    ${theme.breakpoints.down(theme.breakpoints.tablet)} {
      padding: ${theme.space(1)};
    }

    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
    /* margin-bottom: calc(50vh - ${theme.block(2)}); */

    & > h1 {
      ${theme.fonts.h3};

      ${theme.breakpoints.down(theme.breakpoints.tablet)} {
        ${theme.fonts.h4};
      }
    }

    & > h2 {
      ${theme.fonts.h4};

      ${theme.breakpoints.down(theme.breakpoints.tablet)} {
        ${theme.fonts.h5};
      }
    }

    & > h3 {
      ${theme.fonts.h5};

      ${theme.breakpoints.down(theme.breakpoints.tablet)} {
        ${theme.fonts.body1};
        font-weight: 500;
      }
    }

    & > p {
      ${theme.fonts.body1};
      max-width: ${theme.block(7)};
    }

    & > pre {
      background-color: #2d2d2d;
      padding: ${theme.space(1)};
      color: white;
      font-size: 0.8rem;

      & code {
        background-color: transparent;
        padding: 0;
      }
    }

    & code {
      background-color: ${transparentize(0.7, theme.colors.bland)};
      padding: 0 ${theme.space(0.25)};
    }

    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {
  children: React.ReactNode;
}

function PageWrapper(props: Props) {
  const { Root, styles, ...restOfProps } = useStyles(props);

  return <Root {...restOfProps} />;
}

export default PageWrapper;
