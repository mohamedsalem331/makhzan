import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import WarehousesList from '../../components/WarehousesList/WarehousesList'

test('warehouseslist componenet snapshot renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <WarehousesList warehouses={[]} loading={false} error="" />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
