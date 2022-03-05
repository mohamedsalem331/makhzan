import warehouseCreationReducer from './../slices/WarehouseCreationSlice';
import WarehousesFilterReducer from './../slices/WarehousesFilterSlice';
import WarehousesListReducer from '../slices/WarehousesListSlice'

import UserRegisterReducer from '../slices/UserRegisterSlice'
import UserLoginReducer from '../slices/UserLoginSlice'
import UserDetailsReducer from '../slices/UserDetailsSlice'
import UserLogoutReducer from '../slices/UserLogoutSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    warehousesList: WarehousesListReducer,
    warehousesFilter: WarehousesFilterReducer,
    postWarehouse: warehouseCreationReducer,
    userRegister: UserRegisterReducer,
    userLogin: UserLoginReducer,
    userDetails: UserDetailsReducer,
    userLogout: UserLogoutReducer,
  },
})
//  devTools: process.env.NODE_ENV !== 'production',
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

