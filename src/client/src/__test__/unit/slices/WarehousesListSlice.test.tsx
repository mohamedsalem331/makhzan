import { UserRegisterState } from '../../../slices/UserRegisterSlice'
import WarehouseListReducer, { WarehousesListState } from '../../../slices/WarehousesListSlice'
import { warehouses } from '../../TestHelpers/fixtures'

describe('WarehouseList Slice Reduxified', () => {
  const previousState: WarehousesListState = {
    warehouses: [],
    error: '',
    pending: false,
    maxRent: 0,
    maxSize: 0,
  }

  test('should return the initial state', () => {
    expect(WarehouseListReducer(undefined, { type: '' })).toEqual(previousState)
  })

  test('should handle warehouse being added to an empty warehouses arr', () => {
    expect(
      WarehouseListReducer({ ...previousState, warehouses: warehouses }, { type: '' })
    ).toEqual({ ...previousState, warehouses: warehouses })
  })

  test('should handle error', () => {
    expect(
      WarehouseListReducer({ ...previousState, error: 'unable to add warehouse' }, { type: '' })
    ).toEqual({ ...previousState, error: 'unable to add warehouse' })
  })
})
