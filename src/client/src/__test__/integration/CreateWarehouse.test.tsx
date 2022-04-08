import { render, screen, fireEvent, waitFor } from '../test-helpers/redux-router-util'
import PostWarehouse from '../../containers/PostWarehousePage'
// ffdsfsd545431
describe('PostWarehouse Reduxified Container', () => {
  test('should create warehouse', async () => {
    render(<PostWarehouse />)

    const submitButt = screen.getByRole('button', { name: /create warehouse/i })

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    expect(await screen.findByDisplayValue(/Cairo/i)).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.submit(submitButt)
    })
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()

    // expect(submitButt).not.toBeDisabled()

    // expect(await screen.findByText(/Warehouse Created/i)).toBeInTheDocument()
  })
})
