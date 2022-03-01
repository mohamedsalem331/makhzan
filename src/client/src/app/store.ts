import warehousesListReducer from '../slices/WarehousesListSlice'
import UserRegisterSlice from '../slices/UserRegisterSlice'
import UserLoginSlice from '../slices/UserLoginSlice'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    warehousesList: warehousesListReducer,
    userRegister: UserRegisterSlice,
    userLogin: UserLoginSlice
  },
})
//  devTools: process.env.NODE_ENV !== 'production',
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

