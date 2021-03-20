import { all, delay, put, takeLatest } from 'redux-saga/effects';
import * as api from 'shared/services/api';

import { createApplication, signUp } from './reducer';

export function* signUpSaga() {
  try {
    yield delay(2000);

    // const newCount = Math.random() * 100;

    const data = yield api.signUp.post({
      phone: '87472027027',
      fingerprint: '123',
    });

    yield put(signUp.success(data));
  } catch (err) {
    yield put(signUp.failure(err));
  }
}

export function* createApplicationSaga() {
  try {
    yield delay(2000);

    const data = yield api.createApplication.post();

    yield put(createApplication.success(data));
  } catch (err) {
    yield put(createApplication.failure(err));
  }
}

export default function* homePageSagas() {
  yield all([
    takeLatest(signUp.REQUEST, signUpSaga),
    takeLatest(createApplication.REQUEST, createApplicationSaga),
  ]);
}
