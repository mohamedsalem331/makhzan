import React from 'react'
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import ExplorePage from './ExplorePage'
import WarehouseDetails from './WarehouseDetailsPage'
import PostWarehouse from './PostWarehousePage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import '../styles/App.css'
import NotFound from '../components/404/NotFoundRoute'

const App: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token } = useAppSelector((state) => state.userLogin)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const isLoggedIn = !!token

  const ProtectedRoutes = <Route path="postwarehouse" element={<PostWarehouse />} />

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          {isLoggedIn && ProtectedRoutes}
          <Route path="explore">
            <Route index element={<ExplorePage />} />
            <Route path=":id" element={<WarehouseDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* here is not found route */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
