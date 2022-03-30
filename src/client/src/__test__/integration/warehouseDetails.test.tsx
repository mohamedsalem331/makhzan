import { warehouseDetailsHandlerException, warehousesHandlerException } from '../utils/handlers'
import WarehouseDetailsComponent from '../../containers/WarehouseDetailsPage'
import { render, screen } from '../redux-router-util'
import { Route, Routes } from 'react-router-dom'
import { mswServer } from '../utils/msw-server'

describe('WarehouseDetails', () => {
  test('should display warehouse and user details', async () => {
    render(
      <Routes>
        <Route path="explore/:id" element={<WarehouseDetailsComponent />} />
      </Routes>,
      { route: '/explore/123' }
    )

    expect(await screen.findByText(/Warehouse for rent in Cairo/i)).toBeInTheDocument()
    expect(await screen.findByText(/Warehouse Size: 1500 sqm/i)).toBeInTheDocument()

    expect(await screen.findByText(/Admin User/i)).toBeInTheDocument()
  })

  test('should display error message', async () => {
    mswServer.use(warehouseDetailsHandlerException)
    render(
      <Routes>
        <Route path="explore/:id" element={<WarehouseDetailsComponent />} />
      </Routes>,
      { route: '/explore/123' }
    )

    expect(await screen.findByText(/Deliberately broken request/i)).toBeInTheDocument()
  })
})
