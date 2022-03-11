import React from 'react'
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import WarehousesList from './WarehousesList'
import WarehouseDetails from './WarehouseDetails'
import PostWarehouse from './PostWarehouse'
import RegisterPage from './RegisterUser'
import LoginPage from './LoginPage'
import LandingNavbar from '../components/Navbar/NavbarComponent'
import { logoutUser } from '../slices/UserLogoutSlice'
import { localStorageHandler } from '../utils/localStorage'
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

const { removeTokenLocalStorage } = localStorageHandler()

function App() {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token, name } = useAppSelector((state) => state.userDetails)
  const { message, pending, error } = useAppSelector((state) => state.userLogout)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _logoutUser = () =>
    dispatch(logoutUser(token))
      .unwrap()
      .then(() => {
        removeTokenLocalStorage()
      })
      .catch((err) => {
        console.log(err)
      })

  const isLoggedIn = !!token && !message

  return (
    <div className="App">
      <Router>
        <LandingNavbar
          isLoggedIn={isLoggedIn}
          name={name}
          logoutUser={_logoutUser}
          error={error}
          loading={pending}
          Position="absolute"
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="explore">
            <Route element={<WarehousesList />} />
            <Route path=":id" element={<WarehouseDetails />} />
          </Route>
          <Route path="postwarehouse" element={<PostWarehouse />} />
          <Route path="*" element={<LoginPage />} /> {/* here is not found route */}
        </Routes>
      </Router>
      <input type="text" disabled={false} />
    </div>
  )
}

export default App
