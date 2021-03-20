import { combineReducers } from 'redux';
import authReducer from 'store/auth/reducer';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
