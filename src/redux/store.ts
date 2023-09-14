import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { myFormReducer, UserData } from './myFormSlice';
import { layoutStyleReducer, LayoutStyleState } from './layoutStyleSlice';

import { userDataReducer } from './userDataSlice';

export interface RootState {
  myForm: UserData;
  layoutStyle: LayoutStyleState;
  userData: UserData[];
}

// Combine reducers using combineReducers
const rootReducer = combineReducers<RootState>({
  myForm: myFormReducer,
  layoutStyle: layoutStyleReducer,

  userData: userDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
