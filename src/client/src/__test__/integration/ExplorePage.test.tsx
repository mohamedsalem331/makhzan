import { render, fireEvent, screen } from '../test-helpers/redux-router-util'
import ExplorePage from '../../containers/ExplorePage'
import { mswServer } from '../test-helpers/msw-server'
import { warehousesHandlerException } from '../test-helpers/handlers'

describe('WarehousesList Reduxified Container', () => {
  test('should display all warehouses', async () => {
    render(<ExplorePage />)

    expect(await screen.findByTestId('warehouses-nodes')).toBeTruthy()
    expect(await screen.findByText(/Cairo/i)).toBeInTheDocument()
    expect(await screen.findByText(/Giza/i)).toBeInTheDocument()

    expect(await screen.queryByText(/Failed to fetch warehouses/i)).not.toBeInTheDocument()

    expect(await screen.findByText(`${2} Warehouses for Renting`)).toBeInTheDocument()
  })

  test('should display filtered warehouses', async () => {
    const result = render(<ExplorePage />)

    expect(await screen.findAllByTestId('warehouse-node')).toHaveLength(2)

    const governoratesInput = await screen.findByPlaceholderText('Governorates')

    const searchResult = result.container.querySelector('#governorates-filter-option-5')

    fireEvent.change(governoratesInput, { target: { value: 'Cairo' } })

    if (searchResult) {
      fireEvent.keyPress(searchResult, {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      })
    }
    const applyFiltersButton = await screen.findByText(/Apply Filters/i)
    expect(await screen.findAllByText(/Cairo/i)).toHaveLength(2)
    fireEvent.click(applyFiltersButton)
    expect(await screen.findAllByTestId('warehouse-node')).toHaveLength(2)
  })

  test('should fail fetching warehouses', async () => {
    mswServer.use(warehousesHandlerException)
    render(<ExplorePage />)

    expect(await screen.findByText(/Deliberately broken request/i)).toBeInTheDocument()
  })
})
