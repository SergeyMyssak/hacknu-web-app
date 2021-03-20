import * as API from 'store/defaultApi';

const API_URL = 'http://localhost:4000';

const signUpUrl = `${API_URL}/api/auth/check-code`;
export const signUp = (data: any) => API.stdApiPOST({ data, url: signUpUrl });
