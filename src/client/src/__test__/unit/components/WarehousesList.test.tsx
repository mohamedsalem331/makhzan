import WarehousesList from '../../../components/WarehousesList/WarehousesList'
import { render, screen } from '../../test-helpers/redux-router-util'
import { warehouses } from '../../test-helpers/fixtures'

describe('WarehousesList Component', () => {
  test('should render warehouses list', async () => {
    render(<WarehousesList warehouses={warehouses} loading={false} error="" />)

    expect(await screen.findByTestId('warehouses-nodes')).toBeTruthy()
    expect(await screen.findByText(/Cairo/i)).toBeInTheDocument()
  })

  test('should render No warehouses to Display', async () => {
    render(<WarehousesList warehouses={[]} loading={false} error="" />)

    expect(await screen.findByText('No warehouses to Display')).toBeInTheDocument()
    expect(await screen.queryByText(/Cairo/i)).not.toBeInTheDocument()
  })

  test('should render skeleton warehouses while loading', async () => {
    render(<WarehousesList warehouses={warehouses} loading={true} error="" />)

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument()
    expect(await screen.findAllByTestId('skeleton-nodes')).toBeTruthy()
  })

  test('should render error', async () => {
    render(<WarehousesList warehouses={[]} loading={false} error="unable to display warehouses" />)
    expect(await screen.findByText('unable to display warehouses')).toBeInTheDocument()
  })
})
