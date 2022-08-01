import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './globalStore';

const paperSlice = createSlice({
  name: 'paper',
  initialState: {
    value: '',
  },
  reducers: {
    changePaperData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePaperData } = paperSlice.actions;

export const selectPaperValue = (state: RootState) => state.paper.value;

export default paperSlice.reducer;
