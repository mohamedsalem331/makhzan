import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Warehouse from '../../components/WarehousesList/Warehouse'
import { WarehouseAttributes } from '../../types'

const warehouse: WarehouseAttributes = {
  title: 'Warehouse 1500 SQM licensed Food & Beverage',
  description: 'Warehouse for Rent in New Cairo ',
  size: 1500, // sqm
  rent: 150000,
  governorate: 'Cairo',
  location: '6 October City',
  street: '112',
  services: ['Power', 'RFID', 'Networked', 'Thermostat', 'Alarm', 'Bathroom'],
  images: ['https://res.cloudinary.com/makhzan/image/upload/v1643349711/cld-sample.jpg'],
  UserId: '1c023ede-c424-45e6-bae0-0c61b0d2a2d1',
}

test('warehouse componenet snapshot renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Warehouse {...warehouse} />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
