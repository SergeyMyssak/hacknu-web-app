import produce from 'immer';
import { AsyncAction } from 'shared/services/actionHelpers';

export const containerId = 'HomePage';
export const signUp = new AsyncAction(`${containerId}/SIGN_UP`);
export const createApplication = new AsyncAction(
  `${containerId}/CREATE_APPLICATION`
);

interface IState {
  isTokenLoading: boolean;
  accessToken?: any;
  authError?: boolean;

  // counter: number;
  // isCounterLoading: boolean;
  // counterError?: boolean;

  applicationData?: any;
  isApplicationLoading: boolean;
  applicationError?: string;

  // mockData?: any;
  // isMockDataLoading: any;
  // mockDataError?: string;
}

export const initialState: IState = {
  // counter: 0,
  isTokenLoading: false,

  isApplicationLoading: false,
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case signUp.REQUEST:
      draft.isTokenLoading = true;
      draft.authError = undefined;
      break;
    case signUp.SUCCESS:
      draft.accessToken = payload;
      draft.isTokenLoading = false;
      break;
    case signUp.FAILURE:
      draft.isTokenLoading = false;
      draft.counterError = payload;
      break;

    case createApplication.REQUEST:
      draft.isApplicationLoading = true;
      draft.applicationError = undefined;
      break;
    case createApplication.SUCCESS:
      draft.applicationData = payload;
      draft.isApplicationLoading = false;
      break;
    case createApplication.FAILURE:
      draft.isApplicationLoading = false;
      draft.applicationError = payload;
      break;

    default:
  }
}, initialState);
