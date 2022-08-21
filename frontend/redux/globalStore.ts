import { configureStore,combineReducers } from '@reduxjs/toolkit'
import paperSlice from "./paperSlice"
import pdfSlice from './pdfSlice';
import userSummarizeSlice from './userSummarizeSlice';
const GlobalStore = configureStore({
  reducer: combineReducers({
    paper: paperSlice,
    pdf: pdfSlice,
    usersum: userSummarizeSlice
  }),
})

export type RootState = ReturnType<typeof GlobalStore.getState>

export default GlobalStore;


