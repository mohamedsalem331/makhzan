import { render, screen, fireEvent } from '../../TestHelpers/redux-router-util'
import Warehouse from '../../../components/WarehousesList/Warehouse'

import { warehouses } from '../../TestHelpers/fixtures'

describe('Warehouse Component', () => {
  const { size } = warehouses[0]

  test('warehouse componenet renders props', async () => {
    render(<Warehouse {...warehouses[0]} />)

    expect(await screen.findByText(/Cairo/i)).toBeInTheDocument()
    expect(await screen.findAllByText(/1500 sqm/i)).toHaveLength(2)
    expect(size).toEqual(1500)
  })
})
