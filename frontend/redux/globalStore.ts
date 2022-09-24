import { configureStore, combineReducers } from '@reduxjs/toolkit';
import longSummarizeSlice from './longSummarizeSlice';
import paperSlice from './paperSlice';
import pdfSlice from './pdfSlice';
import progressSlice from './progressSlice';
import userSummarizeSlice from './userSummarizeSlice';

const GlobalStore = configureStore({
  reducer: combineReducers({
    paper: paperSlice,
    pdf: pdfSlice,
    usersum: userSummarizeSlice,
    longsum: longSummarizeSlice,
    progress: progressSlice,
  }),
});

export type RootState = ReturnType<typeof GlobalStore.getState>;

export default GlobalStore;
