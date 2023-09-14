import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from '../components/Storage';

export interface UserData {
  user_id: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  nationality: string;
  idCard?: string[];
  gender: string;
  phone: string[];
  idPassport?: string;
  expectedIncome: string;
}

export const initialState: UserData = {
  user_id: '',
  title: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  nationality: '',
  idCard: ['', '', '', '', ''],
  gender: 'non-specific',
  phone: ['+66', ''],
  idPassport: '',
  expectedIncome: '',
};

const myFormSlice = createSlice({
  name: 'myForm',
  initialState,
  reducers: {
    setMyFormData: (_, action: PayloadAction<string>) => {
      const user_id = action.payload;
      const userData = Storage.getUserData(user_id);

      if (userData) {
        return { ...userData };
      } else {
        return initialState;
      }
    },
    resetMyFormData: () => {
      return initialState;
    },
  },
});

export const { setMyFormData, resetMyFormData } = myFormSlice.actions;
export const myFormReducer = myFormSlice.reducer;
