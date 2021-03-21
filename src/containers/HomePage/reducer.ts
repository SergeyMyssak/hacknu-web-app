import produce from 'immer';
import { AsyncAction } from 'shared/services/actionHelpers';

export const containerId = 'HomePage';
export const createApplication = new AsyncAction(
  `${containerId}/CREATE_APPLICATION`
);

interface IState {
  isApplicationLoading: boolean;
  applicationError?: string;
}

export const initialState: IState = {
  isApplicationLoading: false,
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case createApplication.REQUEST:
      draft.isApplicationLoading = true;
      draft.applicationError = undefined;
      break;
    case createApplication.SUCCESS:
      draft.isApplicationLoading = false;
      break;
    case createApplication.FAILURE:
      draft.isApplicationLoading = false;
      draft.applicationError = payload;
      break;

    default:
  }
}, initialState);
