// User Model

export interface UserAttributes {
  id?: number | string
  name: string
  email: string
  password?: string
  phoneNumber: string
  isAdmin?: boolean
  createdAt?: string
  updatedAt?: string
}

// Warehouse Model
export interface WarehouseAttributes {
  id?: number | string
  title: string
  description: string
  rent: number
  size: number
  governorate: string
  location: string
  street: string
  services: Array<string>
  images: Array<string>
  UserId?: number | string
  createdAt?: string
  updatedAt?: string
}

export interface MenuItem {
  id: number
  name: string
  description?: string
  active: boolean
}

export interface Services {
  wifi?: JSX.Element
  power?: JSX.Element
  bathroom?: JSX.Element
  thermostat?: JSX.Element
  iot?: JSX.Element
}

export interface IServices<T> {
  label: string
  Icon: T
}

export interface RegisterState {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
}

export interface LoginState {
  email?: string
  password?: string
}

export interface FilterWarehouseOptions {
  governorates: Array<string>
  locations: Array<string>
  rent?: Array<number>
  size?: Array<number>
}

export interface IFormInput {
  title: string
  description: string
  size: number
  rent: number
  governorate: string
  location: string
  street: string
  services: string[]
}
