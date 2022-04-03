import { UserRegisterState } from '../../../slices/UserRegisterSlice'
import RegisterReducer from '../../../slices/UserRegisterSlice'

describe('Register Slice Reduxified', () => {
  const authUser: UserRegisterState = {
    name: 'Mohamed',
    email: 'mohamed@gmail.com',
    phoneNumber: '12345',
    token: '5543366gg33',
    message: 'Logged In Success',
    error: '',
    pending: false,
  }

  const previousState: UserRegisterState = {
    name: '',
    email: '',
    phoneNumber: '',
    token: '',
    message: '',
    error: '',
    pending: false,
  }

  test('should return the initial state', () => {
    expect(RegisterReducer(undefined, { type: '' })).toEqual(previousState)
  })

  test('should handle adding user auth data', () => {
    expect(RegisterReducer(authUser, { type: '' })).toEqual(authUser)
  })
})
