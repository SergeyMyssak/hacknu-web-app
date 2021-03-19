import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  containerId,
  fetchMockData,
  increaseCounter,
  increaseCounterRandomly,
} from './reducer';

import './styles.scss';

const ExamplePage: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const {
    counter,
    isCounterLoading,
    isMockDataLoading,
    mockDataError,
  } = useSelector((state: any) => state[containerId]);

  const handleActionClick = () => {
    dispatch(increaseCounter.action(1));
  };

  const handleAsyncActionClick = () => {
    dispatch(increaseCounterRandomly.request());
  };

  const handleFetchMockDataClick = () => {
    dispatch(fetchMockData.request());
  };

  return (
    <div className="container">
      <p>{isCounterLoading ? 'Loading...' : counter}</p>
      <button className="btn" onClick={handleActionClick}>
        Action
      </button>
      <br />
      <button className="btn" onClick={handleAsyncActionClick}>
        Async Action
      </button>
      <br />
      <br />
      <p>{isMockDataLoading ? 'Loading...' : mockDataError?.toString()}</p>
      <button className="btn" onClick={handleFetchMockDataClick}>
        Fetch Mock Data
      </button>
    </div>
  );
};

export default ExamplePage;
