import React from 'react'

import '../styles/LandingPage.css'
import SearchComponent from '../components/Filter/SearchComponent'
import LandingNavbar from '../components/Navbar/NavbarComponent'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { localStorageHandler } from '../utils/localStorage'
import { logoutUser } from '../slices/UserLogoutSlice'
import { addFilters } from '../slices/WarehousesFilterSlice'

const { removeTokenLocalStorage } = localStorageHandler()

const LandingPage: React.FC = () => {
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

  const _addFilters = (data: {
    location: string[]
    governorate: string[]
    rent?: number[]
    size?: number[]
  }) => dispatch(addFilters(data))

  return (
    <>
      <div className="ImageContainer">
        <div className="overlay"></div>
        <div className="main-image"></div>
      </div>
      <SearchComponent addFilters={_addFilters} />
    </>
  )
}

export default LandingPage
