import { configureStore,combineReducers } from '@reduxjs/toolkit'
import paperSlice from "./paperSlice"
import pdfSlice from './pdfSlice';
const GlobalStore = configureStore({
  reducer: combineReducers({
    paper: paperSlice,
    pdf: pdfSlice
  }),
})

export type RootState = ReturnType<typeof GlobalStore.getState>

export default GlobalStore;


