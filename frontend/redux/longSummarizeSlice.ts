import { dataExport } from '@/types/paper';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './globalStore';

const longSummarizeSlice = createSlice({
  name: 'longsum',
  initialState: {
    value: [] as dataExport[],
  },
  reducers: {
    changeLongSumValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeLongSumValue } = longSummarizeSlice.actions;

export const selectLongSumValue = (state: RootState) => state.longsum.value;

export default longSummarizeSlice.reducer;
