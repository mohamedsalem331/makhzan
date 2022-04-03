import { UserRegisterState } from '../../../slices/UserRegisterSlice'
import WarehouseCreationReducer from '../../../slices/WarehouseCreationSlice'
import { WarehouseCreationState } from '../../../slices/WarehouseCreationSlice'

describe('WarehouseCreation Slice Reduxified', () => {
  const previousState: WarehouseCreationState = {
    message: '',
    error: '',
    pending: false,
  }

  test('should return the initial state', () => {
    expect(WarehouseCreationReducer(undefined, { type: '' })).toEqual(previousState)
  })

  test('should create new warehouse with success message', () => {
    expect(
      WarehouseCreationReducer(
        { message: 'Warehouse Created Successfully', error: '', pending: false },
        { type: '' }
      )
    ).toEqual({ message: 'Warehouse Created Successfully', error: '', pending: false })
  })

  test('should add error message', () => {
    expect(
      WarehouseCreationReducer(
        { message: '', error: 'Unable to create warehouse', pending: false },
        { type: '' }
      )
    ).toEqual({ message: '', error: 'Unable to create warehouse', pending: false })
  })
})
