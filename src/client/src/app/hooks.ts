import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { services } from '../utils/constants'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Hook for filtering and returning services components
export const useFilteredServices = (myArr: string[]) => {
  return services.filter((service) => {
    if (myArr.indexOf(service.label) !== -1) {
      return service.Icon
    }
    return ''
  })
}
