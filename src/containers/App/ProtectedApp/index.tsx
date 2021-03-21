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
        <div style={{ backgroundColor: '#301272' }}>
          <p style={{ padding: 24, color: '#301272' }}> Header </p>
        </div>
        <Switch>{PROTECTED_ROUTES.map(renderRoute)}</Switch>
      </div>
      <div style={{ backgroundColor: '#301272' }}>
        <p style={{ padding: 24, color: '#301272' }}>Footer</p>
      </div>
    </div>
  );
};

export default ProtectedApp;
