import React, { useState } from 'react'
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import WarehousesList from './ExplorePage'
import WarehouseDetails from './WarehouseDetailsPage'
import PostWarehouse from './PostWarehousePage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import { localStorageHandler } from '../utils/localStorage'
import '../styles/App.css'
import NotFoundPage from '../components/404/NotFoundPage'
import { logoutUser } from '../slices/UserLogoutSlice'
import { logout } from '../slices/UserLoginSlice'

function App() {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token, name } = useAppSelector((state) => state.userLogin)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const isLoggedIn = !!token

  const ProtectedRoutes = () => <Route path="postwarehouse" element={<PostWarehouse />} />

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
          {isLoggedIn && ProtectedRoutes}
          <Route path="*" element={<NotFoundPage />} /> {/* here is not found route */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
