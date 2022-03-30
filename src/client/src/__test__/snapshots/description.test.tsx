import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import WarehouseDescription from '../../components/WarehouseDetails/Description'
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

const user = {
  name: 'Mohamed',
  email: 'mohamed@gmail.com',
  phoneNumber: '54354363',
}

test('WarehouseDescription componenet snapshot renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <WarehouseDescription {...warehouse} {...user} />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
