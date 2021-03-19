import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedApp from './ProtectedApp';

const App: FC = (): JSX.Element => (
  <Router>
    <Switch>
      <Route component={ProtectedApp} />
    </Switch>
  </Router>
);

export default App;
