import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ThemeProvider } from '@material-ui/core';

import axios from 'axios';
import App from 'containers/App';
import { THEME } from 'shared/constants/theme';

import * as serviceWorker from './serviceWorker';
import store from './store';

import './shared/styles/reset.scss';
import './styles.scss';

dayjs.extend(utc);

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
