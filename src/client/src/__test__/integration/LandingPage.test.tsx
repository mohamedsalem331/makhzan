import { render, screen, fireEvent, within, waitFor } from '../test-helpers/redux-router-util'
import LandingPage from '../../containers/LandingPage'
import LoginPage from '../../containers/LoginPage'

describe('Landing Page Reduxified Container', () => {
  test('should render landing page', async () => {
    render(<LandingPage />)

    expect(await screen.findByAltText(/my logo/i)).toBeInTheDocument()

    const bgImage = document.querySelector('.main-image')

    expect(bgImage).toBeInTheDocument()
  })

  test('should render landing navbar with protected routes', async () => {
    render(<LoginPage />)

    const loginButton = await screen.findByRole('button', { name: /sign in/i })

    expect(screen.queryByText('progressbar')).not.toBeInTheDocument()
    expect(screen.queryByText(/post warehouse/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()

    fireEvent.click(loginButton)

    expect(screen.queryByText('progressbar')).not.toBeInTheDocument()
    expect(await screen.findByText(/post warehouse/i)).toBeInTheDocument()
    expect(await screen.findByText(/logout/i)).toBeInTheDocument()
  })

  test('should handle search warehouse inputs', async () => {
    render(<LandingPage />)

    const governorateAutocomplete = screen.getByTestId('governorate-input-testid')
    const governorateInput = within(governorateAutocomplete).getByRole('combobox')

    expect(governorateInput.getAttribute('aria-expanded')).toEqual('false')

    fireEvent.mouseDown(governorateInput)

    governorateAutocomplete.focus()
    governorateInput.focus()

    expect(governorateInput.getAttribute('aria-expanded')).toEqual('true')

    fireEvent.keyDown(governorateAutocomplete, { key: 'ArrowDown' })

    fireEvent.keyDown(governorateAutocomplete, { key: 'Enter' })
  })
})
