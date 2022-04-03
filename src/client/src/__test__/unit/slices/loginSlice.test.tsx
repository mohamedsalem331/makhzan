import { logout, UserLoginState } from '../../../slices/UserLoginSlice'
import UserLoginReducer, { login } from '../../../slices/UserLoginSlice'

describe('Login Slice Reduxified', () => {
  const authUser: UserLoginState = {
    name: 'Mohamed',
    email: 'mohamed@gmail.com',
    phoneNumber: '12345',
    token: '5543366gg33',
    error: '',
    pending: false,
  }

  const previousState: UserLoginState = {
    name: '',
    email: '',
    phoneNumber: '',
    token: '',
    error: '',
    pending: false,
  }

  test('should return the initial state', () => {
    expect(UserLoginReducer(undefined, { type: '' })).toEqual(previousState)
  })

  test('should update user login state', () => {
    expect(UserLoginReducer(previousState, login(authUser))).toEqual(authUser)
  })

  test('should assign empty string to token', () => {
    expect(UserLoginReducer(authUser, logout())).toEqual({
      ...authUser,
      token: '',
    })
  })
})
