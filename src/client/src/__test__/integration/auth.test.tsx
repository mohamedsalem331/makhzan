import { render, fireEvent, screen } from '../test-helpers/redux-router-util'
import LoginPage from '../../containers/LoginPage'

describe('Auth Reduxified Container', () => {
  test('should render login page', async () => {
    render(<LoginPage />)

    expect(await screen.findByAltText(/my logo/i)).toBeInTheDocument()

    const signinButton = screen.getByRole('button', { name: /Sign In/i })

    expect(signinButton).toBeTruthy()
  })

  test('should authenticate user with successfull login message', async () => {
    render(<LoginPage />)
    const inputEmail = screen.getByTestId('email-inputElement')
    const inputPassword = screen.getByTestId('password-inputElement')
    const signinButton = screen.getByRole('button', { name: /Sign In/i })

    fireEvent.change(inputEmail, { target: { value: '' } })
    fireEvent.change(inputPassword, { target: { value: '' } })

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
