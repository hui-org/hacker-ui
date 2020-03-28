import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table head base styles
  root: css`
    th {
      font-weight: 600;
    }
  `,
}));

type TableHeadProps = JSX.IntrinsicElements['thead'];

interface Props extends PropsFromStyles<typeof useStyles>, TableHeadProps {}

const TableHead = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'thead');
  return <Root ref={ref} {...restOfProps} />;
});

TableHead.displayName = 'TableHead';

export default TableHead;
