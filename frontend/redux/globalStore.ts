import { configureStore,combineReducers } from '@reduxjs/toolkit'
import paperSlice from "./paperSlice"
const GlobalStore = configureStore({
  reducer: combineReducers({
    paper: paperSlice,
  }),
})

export type RootState = ReturnType<typeof GlobalStore.getState>

export default GlobalStore;


