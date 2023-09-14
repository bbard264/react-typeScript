import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from '../components/Storage';
import { UserData } from './myFormSlice';

const initialState: UserData[] = Storage.getAll();
const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    createUserData: (state, action: PayloadAction<UserData>) => {
      Storage.saveOrUpdate(action.payload);
      state.push(action.payload);
    },
    editUserData: (state, action: PayloadAction<UserData>) => {
      const newData = action.payload;
      Storage.saveOrUpdate(newData);
      const index = state.findIndex((data) => data.user_id === newData.user_id);
      if (index !== -1) {
        state[index] = newData;
      }
    },
    removeUserData: (state, action: PayloadAction<string[]>) => {
      const user_idsToRemove = action.payload;
      user_idsToRemove.forEach((user_id) => {
        Storage.remove([user_id]);
      });
      return state.filter((data) => !user_idsToRemove.includes(data.user_id));
    },
  },
});

export const { createUserData, editUserData, removeUserData } =
  userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
