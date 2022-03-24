import warehouseCreationReducer from './../slices/WarehouseCreationSlice';
import WarehousesFilterReducer from './../slices/WarehousesFilterSlice';
import WarehousesListReducer from '../slices/WarehousesListSlice'
import WarehouseDetailsReducer from '../slices/WarehouseDetailsSlice'
import UserRegisterReducer from '../slices/UserRegisterSlice'
import UserLoginReducer, { authMiddleware } from '../slices/UserLoginSlice'
import UserLogoutReducer from '../slices/UserLogoutSlice'


import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = {
  warehousesList: WarehousesListReducer,
  warehousesFilter: WarehousesFilterReducer,
  postWarehouse: warehouseCreationReducer, // warehouseCreation
  warehouseDetails: WarehouseDetailsReducer,
  userRegister: UserRegisterReducer,
  userLogin: UserLoginReducer,
  userLogout: UserLogoutReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})
//  devTools: process.env.NODE_ENV !== 'production',
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

