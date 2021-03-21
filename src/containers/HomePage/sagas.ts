import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from 'shared/services/api';

import { API } from '../../index';

import { createApplication } from './reducer';

function* createApplicationSaga(action: any): any {
  const { payload } = action;
  const { reset } = payload;

  try {
    const { data } = yield call(api.signUp.post, payload);
    const { tokens } = data;
    const { accessToken } = tokens;

    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    yield call(api.createApplication.post, payload);

    yield put(createApplication.success(data));
    reset();
  } catch (e) {
    yield put(createApplication.failure(e));
  }
}

export default function* homePageSagas() {
  yield takeLatest(createApplication.REQUEST, createApplicationSaga);
}
