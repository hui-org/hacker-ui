import React, { useEffect, useState, memo, Suspense } from 'react';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { createStyles, PropsFromStyles } from 'react-style-system';
import docArray from '../docs';
import flattenDocArray from './flattenDocArray';

import Nav from './Nav';
import AppBar from './AppBar';
import NoRoute from './NoRoute';
import PageWrapper from './PageWrapper';
import LoadingView from './LoadingView';
import Docs from './Docs';
import Landing from './Landing';

const routes = flattenDocArray(docArray).map(
  ({ component, ...restOfProps }) => {
    const Component = component as React.ComponentType<any>;

    return {
      component: (props: any) => (
        <PageWrapper>
          <Component {...props} />
        </PageWrapper>
      ),
      ...restOfProps,
    };
  },
);
const firstPath = routes[0].path as string;

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    height: 100%;
    overflow: hidden;
    display: flex;
    background-color: ${theme.surface};
  `,
  nav: css`
    flex: 0 0 auto;
  `,
  content: css`
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,
  appBar: css`
    flex: 0 0 auto;
  `,
  main: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function App(props: Props) {
  const { Root, styles } = useStyles(props);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const handler = () =>
      // TODO: this timeout is not reliable
      setTimeout(() => {
        const { Prism } = window as any;
        if (!Prism) return;
        Prism.highlightAll();

        window.scrollTo(0, 0);
      }, 500);

    const unsubscribe = history.listen(handler);
    handler();

    return unsubscribe;
  }, [history]);

  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Docs />
    </Switch>
  );
}

export default memo(App);
