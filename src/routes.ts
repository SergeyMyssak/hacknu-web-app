import { FC } from 'react';

import ExamplePage from 'containers/ExamplePage';
import HomePage from 'containers/HomePage';

export interface IRoute {
  url: string;
  Component: FC;
}

export const PROTECTED_ROUTES: IRoute[] = [
  { url: '/example', Component: ExamplePage },
  { url: '/', Component: HomePage },
];
