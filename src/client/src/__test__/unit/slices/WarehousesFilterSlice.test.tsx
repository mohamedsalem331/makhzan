import { UserRegisterState } from '../../../slices/UserRegisterSlice'
import FilterReducer, { addFilters, clearFilters } from '../../../slices/WarehousesFilterSlice'
import { WarehousesFilterState } from '../../../slices/WarehousesFilterSlice'

describe('Filter Slice Reduxified', () => {
  const filters = {
    governorates: ['cairo'],
    locations: ['maadi'],
    rent: [0, 100],
    size: [200, 300],
  }

  const previousState: WarehousesFilterState = {
    filteredWarehouses: [],
    governorates: [],
    locations: [],
    rent: [0, 0],
    size: [0, 0],
    error: '',
    pending: false,
  }

  const mockState: WarehousesFilterState = {
    filteredWarehouses: [],
    governorates: ['giza'],
    locations: ['dokki'],
    rent: [100, 500],
    size: [400, 800],
    error: '',
    pending: false,
  }

  test('should return the initial state', () => {
    expect(FilterReducer(undefined, { type: '' })).toEqual(previousState)
  })

  test('should handle adding filters', () => {
    expect(FilterReducer(previousState, addFilters(filters))).toEqual({
      ...filters,
      filteredWarehouses: [],
      error: '',
      pending: false,
    })
  })

  test('should handle updating filters', () => {
    expect(FilterReducer(mockState, addFilters(filters))).toEqual({
      ...filters,
      filteredWarehouses: [],
      error: '',
      pending: false,
    })
  })

  test('should handle clear filters', () => {
    expect(FilterReducer(previousState, clearFilters())).toEqual(previousState)
  })

  test('should handle error', () => {
    expect(
      FilterReducer({ ...previousState, error: 'Unable to add filters' }, { type: '' })
    ).toEqual({ ...previousState, error: 'Unable to add filters' })
  })
})
