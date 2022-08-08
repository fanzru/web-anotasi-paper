import { dataPaper } from '@/types/paper';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './globalStore';

const paperSlice = createSlice({
  name: 'paper',
  initialState: {
    value: {} as dataPaper,
  },
  reducers: {
    changePaperValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePaperValue } = paperSlice.actions;

export const selectPaperValue = (state: RootState) => state.paper.value;

export default paperSlice.reducer;
