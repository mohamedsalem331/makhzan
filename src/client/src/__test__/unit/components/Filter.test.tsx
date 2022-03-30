import FilterComponent from '../../../components/Filter/FilterComponent'
import { FilterWarehouseOptions } from '../../../types'
import { render, screen, fireEvent } from '../../redux-router-util'

const addFilters = jest.fn((filters: FilterWarehouseOptions): void => {})
const clearFilters = jest.fn()

describe('Filter Component', () => {
  test('should render filter component with props', async () => {
    render(
      <FilterComponent
        addFilters={addFilters}
        clearFilters={clearFilters}
        locations={['Maadi']}
        governorates={['Cairo']}
      />
    )

    expect(await screen.findByText(/cairo/i)).toBeInTheDocument()
    expect(await screen.findByText(/maadi/i)).toBeInTheDocument()
  })

  test('should input change min and max size', async () => {
    render(
      <FilterComponent
        addFilters={addFilters}
        clearFilters={clearFilters}
        locations={['Maadi']}
        governorates={['Cairo']}
      />
    )
    const minSizeInput = await screen.findByTestId('min-size-input')
    const maxSizeInput = await screen.findByTestId('max-size-input')

    expect(minSizeInput).toBeTruthy()
    expect(maxSizeInput).toBeTruthy()

    fireEvent.change(minSizeInput, { target: { value: 100 } })
    fireEvent.change(maxSizeInput, { target: { value: 200 } })

    expect(minSizeInput).toHaveValue(100)
    expect(maxSizeInput).toHaveValue(200)
  })

  test('should clear all input values', async () => {
    render(
      <FilterComponent
        addFilters={addFilters}
        clearFilters={clearFilters}
        locations={['Maadi']}
        governorates={['Cairo']}
      />
    )

    const minSizeInput = await screen.findByTestId('min-size-input')
    const maxSizeInput = await screen.findByTestId('max-size-input')
    const clearFiltersButton = await screen.findByText(/Remove Filters/i)
    const applyFiltersButton = await screen.findByText(/Apply Filters/i)

    fireEvent.change(minSizeInput, { target: { value: 100 } })
    fireEvent.change(maxSizeInput, { target: { value: 200 } })

    fireEvent.click(applyFiltersButton)
    fireEvent.click(clearFiltersButton)

    expect(await screen.queryByText(/cairo/i)).not.toBeInTheDocument()
    expect(await screen.queryByText(/maadi/i)).not.toBeInTheDocument()
    expect(minSizeInput).toHaveValue(0)
    expect(maxSizeInput).toHaveValue(0)
  })
})
