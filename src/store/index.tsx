import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'store/rootReducer';

export const initStore = (initialState = {}) =>
  createStore(reducer, initialState, applyMiddleware(thunk));
