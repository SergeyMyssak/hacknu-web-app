import { API } from 'index';
import { ROOT_ENDPOINTS } from 'shared/constants/api';

import { Url } from './url';

export const example = {
  get: () => API.get(new Url(`${ROOT_ENDPOINTS.example}/iam`).toString()),
};
