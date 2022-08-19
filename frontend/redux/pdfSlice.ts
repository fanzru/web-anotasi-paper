import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './globalStore';

const pdfSlice = createSlice({
  name: 'pdf',
  initialState: {
    value: '',
  },
  reducers: {
    changePdfData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePdfData } = pdfSlice.actions;

export const selectPdfValue = (state: RootState) => state.pdf.value;

export default pdfSlice.reducer;
