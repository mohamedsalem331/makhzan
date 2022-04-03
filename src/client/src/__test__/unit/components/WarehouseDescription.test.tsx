import WarehouseDescription from '../../../components/WarehouseDetails/Description'
import { render, screen, fireEvent } from '../../TestHelpers/redux-router-util'
import { users, warehouses } from '../../TestHelpers/fixtures'

const warehouse = warehouses[0]
const user = users[0]

describe('Description Component', () => {
  test('should render Description component with props', async () => {
    render(<WarehouseDescription {...warehouse} {...user} />)

    expect(await screen.findByText(/Warehouse for rent in Cairo/i)).toBeInTheDocument()
    expect(await screen.findByText(/Warehouse Size: 1500 sqm/i)).toBeInTheDocument()

    expect(await screen.findByText(/Admin User/i)).toBeInTheDocument()
    expect(await screen.findAllByTestId('warehouse-services')).toHaveLength(
      warehouse.services.length
    )
  })

  test('should render email or phonenumber', async () => {
    render(<WarehouseDescription {...warehouse} {...user} />)

    const emailButton = await screen.findByText(/email/i)
    const phoneNumButton = await screen.findByText(/call/i)

    fireEvent.mouseOver(emailButton)
    fireEvent.mouseOver(phoneNumButton)

    expect(await screen.findByText(user.email)).toBeInTheDocument()
    expect(await screen.findByText(user.phoneNumber)).toBeInTheDocument()
  })
})
