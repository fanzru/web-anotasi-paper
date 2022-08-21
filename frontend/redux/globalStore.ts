import { configureStore, combineReducers } from '@reduxjs/toolkit';
import longSummarizeSlice from './longSummarizeSlice';
import paperSlice from './paperSlice';
import pdfSlice from './pdfSlice';
import userSummarizeSlice from './userSummarizeSlice';

const GlobalStore = configureStore({
  reducer: combineReducers({
    paper: paperSlice,
    pdf: pdfSlice,
    usersum: userSummarizeSlice,
    longsum: longSummarizeSlice,
  }),
});

export type RootState = ReturnType<typeof GlobalStore.getState>;

export default GlobalStore;
