import { all, delay, put, takeLatest } from 'redux-saga/effects';
import * as api from 'shared/services/api';

import { fetchMockData, increaseCounterRandomly } from './reducer';

export function* increaseCounterRandomlySaga() {
  try {
    yield delay(2000);

    const newCount = Math.random() * 100;

    yield put(increaseCounterRandomly.success(newCount));
  } catch (err) {
    yield put(increaseCounterRandomly.failure(err));
  }
}

export function* fetchMockDataSaga() {
  try {
    yield delay(2000);

    const data = yield api.example.get();

    yield put(fetchMockData.success(data));
  } catch (err) {
    yield put(fetchMockData.failure(err));
  }
}

export default function* examplePageSagas() {
  yield all([
    takeLatest(increaseCounterRandomly.REQUEST, increaseCounterRandomlySaga),
    takeLatest(fetchMockData.REQUEST, fetchMockDataSaga),
  ]);
}
