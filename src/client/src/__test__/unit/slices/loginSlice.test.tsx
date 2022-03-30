import { logout, UserLoginState } from '../../../slices/UserLoginSlice'
import { render, screen } from '../../redux-router-util'
import UserLoginReducer, { login } from '../../../slices/UserLoginSlice'
import { UserAttributes } from '../../../types'

describe('Testing Login Slice Redux', () => {
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

  test('should return the initial login reducer state', () => {
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
