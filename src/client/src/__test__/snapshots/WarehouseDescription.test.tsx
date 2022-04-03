import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import WarehouseDescription from '../../components/WarehouseDetails/Description'
import { warehouses } from '../TestHelpers/fixtures'

const user = {
  name: 'Mohamed',
  email: 'mohamed@gmail.com',
  phoneNumber: '54354363',
}

test('WarehouseDescription component snapshot renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <WarehouseDescription {...warehouses[0]} {...user} />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
