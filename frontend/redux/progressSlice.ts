import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './globalStore';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    value: false,
  },
  reducers: {
    changeProgressData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeProgressData } = progressSlice.actions;

export const selectProgressValue = (state: RootState) => state.progress.value;

export default progressSlice.reducer;
