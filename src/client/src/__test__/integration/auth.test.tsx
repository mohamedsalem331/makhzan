import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, fireEvent, screen } from '../redux-router-util'
import LoginPage from '../../containers/LoginPage'

describe('Login User', () => {
  test('should authenticate user with successfull login', async () => {
    render(<LoginPage />)
    const inputEmail = screen.getByTestId('email-inputElement')
    const inputPassword = screen.getByTestId('password-inputElement')
    const signinButton = screen.getByRole('button', { name: /Sign In/i })

    expect(signinButton).toBeDisabled()
    expect(screen.queryByText('Login Successful')).not.toBeInTheDocument()

    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } })
    fireEvent.change(inputPassword, { target: { value: '123456' } })

    expect(signinButton).not.toBeDisabled()

    fireEvent.click(signinButton)

    expect(await screen.findByText(/Login Successful/i)).toBeInTheDocument()
    expect(await screen.findByText(/JP/i)).toBeInTheDocument()
  })
})
