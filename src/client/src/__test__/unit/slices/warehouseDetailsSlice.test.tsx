import { UserRegisterState } from '../../../slices/UserRegisterSlice'
import WarehousesDetailsReducer, {
  WarehousesDetailsState,
} from '../../../slices/WarehouseDetailsSlice'

describe('WarehousesDetails Slice Reduxified', () => {
  const WarehouseDetails: WarehousesDetailsState = {
    warehouse: {
      title: 'new warehouse',
      description: 'its new!',
      size: 100,
      rent: 10000,
      governorate: 'Cairo',
      location: 'Maadi',
      street: '55',
      services: ['Alarm'],
      images: ['image link 1'],
    },
    user: {
      name: 'Adam Beyer',
      email: 'a@gmail.com',
      password: '1234',
      phoneNumber: '4444',
    },
    error: '',
    pending: false,
  }

  const previousState: WarehousesDetailsState = {
    warehouse: {
      title: '',
      description: '',
      size: 0,
      rent: 0,
      governorate: '',
      location: '',
      street: '',
      services: [],
      images: [],
    },
    user: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    error: '',
    pending: false,
  }

  test('should return the initial state', () => {
    expect(WarehousesDetailsReducer(undefined, { type: '' })).toEqual(previousState)
  })

  test('should handle adding warehouse details', () => {
    expect(WarehousesDetailsReducer(WarehouseDetails, { type: '' })).toEqual(WarehouseDetails)
  })

  test('should handle warehouse details error message', () => {
    expect(
      WarehousesDetailsReducer(
        { ...WarehouseDetails, error: 'Unable to fetch warehouse details' },
        { type: '' }
      )
    ).toEqual({
      ...WarehouseDetails,
      error: 'Unable to fetch warehouse details',
    })
  })
})
