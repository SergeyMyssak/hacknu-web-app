import { API } from 'index';
import { ROOT_ENDPOINTS } from 'shared/constants/api';

import { Url } from './url';

export const STD_HEADERS = {
  Accept: 'application/json, application/xml, text/plain, text/html, *.*',
  'Content-Type': 'application/json',
  Authorization: '',
  'Accept-Language': '',
};

const modifyHeader = (token: any) => {
  const headers = STD_HEADERS;

  const str = token.replace(/"/g, '');
  headers['Authorization'] = `Bearer ${str}`;

  return headers;
};

export const example = {
  get: () => API.get(new Url(`${ROOT_ENDPOINTS.example}/iam`).toString()),
};

export const createApplication = {
  post: (params: any) =>
    API.post(new Url(`${ROOT_ENDPOINTS.createApplication}`).toString(), {
      method: 'POST',
      headers: modifyHeader(params.access_token),
      data: JSON.stringify(params.body || {}),
    }),
};

export const signUp = {
  post: (params: any) =>
    API.post(new Url(`${ROOT_ENDPOINTS.signUp}`).toString(), {
      method: 'POST',
      data: JSON.stringify(params.body || {}),
    }),
};
