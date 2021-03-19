import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import examplePageReducer, {
  containerId as examplePageId,
} from './containers/ExamplePage/reducer';
import examplePageSagas from './containers/ExamplePage/sagas';

const rootReducer = combineReducers({
  [examplePageId]: examplePageReducer,
});

const sagas = [examplePageSagas];

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagas.forEach((saga) => sagaMiddleware.run(saga));

export default store;
