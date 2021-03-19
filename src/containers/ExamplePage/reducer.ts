import produce from 'immer';
import { Action, AsyncAction } from 'shared/services/actionHelpers';

export const containerId = 'ExamplePage';
export const increaseCounter = new Action(`${containerId}/COUNTER_INCREASE`);
export const increaseCounterRandomly = new AsyncAction(
  `${containerId}/COUNTER_RANDOMLY_INCREASE`
);
export const fetchMockData = new AsyncAction(`${containerId}/MOCK_DATA_FETCH`);

interface IState {
  counter: number;
  isCounterLoading: boolean;
  counterError?: boolean;

  mockData?: any;
  isMockDataLoading: any;
  mockDataError?: string;
}

export const initialState: IState = {
  counter: 0,
  isCounterLoading: false,

  isMockDataLoading: false,
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case increaseCounter.ACTION:
      draft.counter = draft.counter + payload;
      break;

    case increaseCounterRandomly.REQUEST:
      draft.isCounterLoading = true;
      draft.counterError = undefined;
      break;
    case increaseCounterRandomly.SUCCESS:
      draft.counter = payload;
      draft.isCounterLoading = false;
      break;
    case increaseCounterRandomly.FAILURE:
      draft.isCounterLoading = false;
      draft.counterError = payload;
      break;

    case fetchMockData.REQUEST:
      draft.isMockDataLoading = true;
      draft.mockDataError = undefined;
      break;
    case fetchMockData.SUCCESS:
      draft.mockData = payload;
      draft.isMockDataLoading = false;
      break;
    case fetchMockData.FAILURE:
      draft.isMockDataLoading = false;
      draft.mockDataError = payload;
      break;

    default:
  }
}, initialState);
