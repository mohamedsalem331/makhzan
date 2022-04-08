import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Warehouse from '../../components/WarehousesList/Warehouse'
import { warehouses } from '../test-helpers/fixtures'

test('warehouse component snapshot renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Warehouse {...warehouses[0]} />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
