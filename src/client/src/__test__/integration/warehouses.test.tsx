import { render, fireEvent, screen } from '../redux-router-util'
import ExplorePage from '../../containers/ExplorePage'
import { mswServer } from '../utils/msw-server'
import { warehousesHandlerException } from '../utils/handlers'

describe('WarehousesList', () => {

  test('should display warehouses', async () => {
    render(<ExplorePage />)

    expect(await screen.findByTestId('warehouses-nodes')).toBeTruthy()
    expect(await screen.findByText(/Cairo/i)).toBeInTheDocument()
    expect(await screen.findByText(/Giza/i)).toBeInTheDocument()
    expect(await screen.queryByText(/Failed to fetch warehouses/i)).not.toBeInTheDocument()
    expect(await screen.findByText(`${2} Warehouses for Renting`)).toBeInTheDocument()
  })

  test('should display error message', async () => {
    mswServer.use(warehousesHandlerException)
    render(<ExplorePage />)

    expect(await screen.findByText(/Deliberately broken request/i)).toBeInTheDocument()
  })
})
