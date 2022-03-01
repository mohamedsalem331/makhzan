// User Model
import { ComponentType, FC } from 'react'


export interface UserAttributes {
  id?: number | string
  name: string
  email: string
  password: string
  phoneNumber: number
  isAdmin?: boolean
}

// Warehouse Model
export interface WarehouseAttributes {
  id?: number | string
  title: string
  description: string
  size: number
  rent: number
  governorate: string
  location: string
  street: string
  services: Array<string>
  images: Array<string>
  UserId?: number | string
}

export interface MenuItem {
  id: number
  name: string
  description?: string
  active: boolean
}

export interface Route {
  key: string
  title: string
  description?: string
  path?: string
  component?: FC<{}>
  isEnabled: boolean
  icon?: ComponentType
  subRoutes?: Route[]
  appendDivider?: boolean
  expanded?: boolean
}

export interface Services {
  wifi?: JSX.Element,
  power?: JSX.Element,
  bathroom?: JSX.Element,
  thermostat?: JSX.Element,
  iot?: JSX.Element,
}

export interface RegisterState {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
}

export interface LoginState {
  email: string
  password: string
}

