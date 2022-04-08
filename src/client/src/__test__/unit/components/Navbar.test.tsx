import NavLinks from '../../../components/Navbar/NavLinks'
import SideMenu from '../../../components/Navbar/SideMenu'
import LandingNavbar from '../../../containers/LandingNavbar'
import { createMatchMedia } from '../../__mocks__/MatchMedia'
import { render, screen, fireEvent } from '../../test-helpers/redux-router-util'

const logoutUser = jest.fn()

describe('Navbar Component', () => {
  beforeAll(() => {
    // for overriding the setuptests default and rendering side menu instead of navlinks
    window.matchMedia = createMatchMedia(300)
  })
  test('navlinks render with protected routes', async () => {
    render(<NavLinks isLoggedIn={true} userName={'Amanda Smith'} logoutUser={logoutUser} />)

    expect(await screen.findByText(/AS/i)).toBeInTheDocument()
    expect(await screen.findByText(/Post Warehouse/i)).toBeInTheDocument()
  })

  test('navlinks render with user not authenticated', async () => {
    render(<NavLinks isLoggedIn={false} userName={'Amanda Smith'} logoutUser={logoutUser} />)

    expect(await screen.findByText(/Login/i)).toBeInTheDocument()
    expect(await screen.findByText(/Join Now/i)).toBeInTheDocument()
    expect(await screen.queryByText(/Post Warehouse/i)).not.toBeInTheDocument()
  })

  test('sidemenu render with user authenticated', async () => {
    render(<SideMenu isLoggedIn={true} logoutUser={logoutUser} />)

    expect(await screen.queryByText(/AS/i)).not.toBeInTheDocument()
    expect(await screen.findByText(/Post Warehouse/i)).toBeInTheDocument()
  })
})
