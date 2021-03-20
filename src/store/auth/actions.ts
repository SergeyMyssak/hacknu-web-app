import * as api from 'store/auth/api';
import { defaultAction } from 'store/defaultActions';

import { GET_USER, LoginRequest } from './types';

export const signUp = (data: LoginRequest, callbacks?: any) => (
  dispatch: any,
  getState: any
) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_USER,
    apiCall: () => api.signUp(data),
    onSuccess: (response: any) => ({ data: response }),
    onError: (response: any) => ({ error: response }),
  });
};

export default {
  signUp,
};
