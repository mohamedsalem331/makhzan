import {
  warehouseDetailsHandlerException,
  warehousesHandlerException,
} from '../TestHelpers/handlers'
import WarehouseDetailsComponent from '../../containers/WarehouseDetailsPage'
import { render, screen } from '../TestHelpers/redux-router-util'
import { Route, Routes } from 'react-router-dom'
import { mswServer } from '../TestHelpers/msw-server'

describe('WarehouseDetails Reduxified Container', () => {
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

  test('should fail fetching warehouse details with error message', async () => {
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
