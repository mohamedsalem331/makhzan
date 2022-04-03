import { warehouseCreationHandlerException } from '../TestHelpers/handlers'
import WarehouseDetailsComponent from '../../containers/WarehouseDetailsPage'
import { render, screen, fireEvent, act } from '../TestHelpers/redux-router-util'
import { Route, Routes } from 'react-router-dom'
import { mswServer } from '../TestHelpers/msw-server'
import PostWarehouse from '../../containers/PostWarehousePage'
// ffdsfsd545431
describe('PostWarehouse Reduxified Container', () => {
  test('should create warehouse', async () => {
    render(<PostWarehouse />)

    const submitButt = screen.getByRole('button', { name: /Create Warehouse/i })
    const servicesInput = await screen.findByTestId('services-input-testid')
    const titleInput = await screen.getByPlaceholderText('Title')
    const descInput = await screen.getByPlaceholderText('Description')

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    expect(await screen.findByDisplayValue(/Cairo/i)).toBeInTheDocument()

    fireEvent.input(descInput, { target: { value: 'here is some desc text' } })
    fireEvent.input(titleInput, { target: { value: 'my title' } })
    fireEvent.input(servicesInput, { target: { value: 'Power,' } })

    fireEvent.submit(submitButt)

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()

    expect(submitButt).not.toBeDisabled()

    expect(await screen.findByText(/Warehouse Created/i)).toBeInTheDocument()
  })

  test('should fail creating warehouse with error message', async () => {
    mswServer.use(warehouseCreationHandlerException)
    render(<PostWarehouse />)
    const submitButt = screen.getByRole('button', { name: /Create Warehouse/i })
    fireEvent.submit(submitButt)

    expect(await screen.findByText(/Deliberately broken request/i)).toBeInTheDocument()
  })
})
