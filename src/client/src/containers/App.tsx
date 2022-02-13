import React from 'react'
import LandingPage from '../components/LandingPage'
import { Counter } from '../redux/counter/Counter'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import '../styles/App.css'
import WarehousesList from './WarehousesList'
import Warehouse from './Warehouse'
import PostWarehouse from './PostWarehouse'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'

// const routes = [
//   {
//     path: '/sandwiches',
//     component: Sandwiches,
//   },
//   {
//     path: '/tacos',
//     component: Tacos,
//     routes: [
//       {
//         path: '/tacos/bus',
//         component: Bus,
//       },
//       {
//         path: '/tacos/cart',
//         component: Cart,
//       },
//     ],
//   },
// ]

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="warehouses" element={<WarehousesList />} />
          <Route path="warehouses/:id" element={<Warehouse />} />
          <Route path="/postwarehouse" element={<PostWarehouse />} />
          <Route path="*" element={<Warehouse />} /> {/* here is not found route */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
