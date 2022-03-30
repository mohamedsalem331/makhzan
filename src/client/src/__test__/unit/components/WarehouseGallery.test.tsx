import WarehouseGallery from '../../../components/WarehouseDetails/WarehouseGallery'
import { render, screen, fireEvent } from '../../redux-router-util'
import { users, warehouses } from '../../utils/data'

const warehouse = warehouses[0]

describe('WarehouseGallery Component', () => {
  // beforeAll(() => {
  //     // for overriding the setuptests default and rendering side menu instead of navlinks
  //     window.matchMedia = createMatchMedia(300)
  //   })
  test('should render WarehouseGallery component with props', async () => {
    render(<WarehouseGallery Images={warehouse.images} />)

    expect(await screen.findByRole('img')).toBeTruthy()
  })

  //   test('should render email or phonenumber', async () => {
  //     render(<WarehouseDescription {...warehouse} {...user} />)

  //     const emailButton = await screen.findByText(/email/i)
  //     const phoneNumButton = await screen.findByText(/call/i)

  //     fireEvent.mouseOver(emailButton)
  //     fireEvent.mouseOver(phoneNumButton)

  //     expect(await screen.findByText(user.email)).toBeInTheDocument()
  //     expect(await screen.findByText(user.phoneNumber)).toBeInTheDocument()
  //   })
})
