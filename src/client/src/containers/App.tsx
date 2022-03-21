import React from 'react'
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import WarehousesList from './ExplorePage'
import WarehouseDetails from './WarehouseDetailsPage'
import PostWarehouse from './PostWarehousePage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'

import '../styles/App.css'

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
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="explore">
            <Route index element={<WarehousesList />} />
            <Route path=":id" element={<WarehouseDetails />} />
          </Route>
          <Route path="postwarehouse" element={<PostWarehouse />} />
          <Route path="*" element={<LoginPage />} /> {/* here is not found route */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
