import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { IRoute, PROTECTED_ROUTES } from 'routes';

import './styles.scss';

const ProtectedApp: FC = (): JSX.Element => {
  const renderRoute = ({ url, Component }: IRoute): JSX.Element => (
    <Route key={url} path={url} component={Component} />
  );

  return (
    <div className="app">
      <div className="app__content">
        <p style={{ padding: 24 }}>Header</p>
        <Switch>{PROTECTED_ROUTES.map(renderRoute)}</Switch>
      </div>
      <p style={{ padding: 24 }}>Footer</p>
    </div>
  );
};

export default ProtectedApp;
