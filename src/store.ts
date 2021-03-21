import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import examplePageReducer, {
  containerId as examplePageId,
} from './containers/ExamplePage/reducer';
import examplePageSagas from './containers/ExamplePage/sagas';
import homePageReducer, {
  containerId as homePageId,
} from './containers/HomePage/reducer';
import homePageSagas from './containers/HomePage/sagas';

const rootReducer = combineReducers({
  [examplePageId]: examplePageReducer,
  [homePageId]: homePageReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const sagas = [examplePageSagas, homePageSagas];

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagas.forEach((saga) => sagaMiddleware.run(saga));

export default store;
