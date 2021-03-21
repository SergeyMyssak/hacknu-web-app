import { API } from 'index';
import { ROOT_ENDPOINTS } from 'shared/constants/api';

import { Url } from './url';

export const example = {
  get: () => API.get(new Url(`${ROOT_ENDPOINTS.example}/iam`).toString()),
};

export const createApplication = {
  post: (data: any) =>
    API.post(new Url(`${ROOT_ENDPOINTS.createApplication}`).toString(), data),
};

export const signUp = {
  post: (data: any) =>
    API.post(new Url(`${ROOT_ENDPOINTS.signUp}`).toString(), data),
};
