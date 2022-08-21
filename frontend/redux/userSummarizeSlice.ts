import { dataExport } from '@/types/paper';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './globalStore';

const userSummarizeSlice = createSlice({
  name: 'usersum',
  initialState: {
    value: {} as dataExport,
  },
  reducers: {
    changeUserSummValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeUserSummValue } = userSummarizeSlice.actions;

export const selectUserSumValue = (state: RootState) => state.usersum.value;

export default userSummarizeSlice.reducer;
