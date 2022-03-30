import React from 'react'

import SearchComponent from '../components/Filter/SearchComponent'
import LandingNavbar from './LandingNavbar'
import { useAppDispatch } from '../app/hooks'
// import { localStorageHandler } from '../utils/localStorage'
import { addFilters } from '../slices/WarehousesFilterSlice'

import '../styles/LandingPage.css'

// const { removeTokenLocalStorage } = localStorageHandler()

const LandingPage: React.FC = () => {
  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _addFilters = (data: {
    locations: string[]
    governorates: string[]
    rent?: number[]
    size?: number[]
  }) => dispatch(addFilters(data))

  return (
    <>
      <LandingNavbar />
      <div className="ImageContainer">
        <div className="overlay"></div>
        <div className="main-image"></div>
      </div>
      <SearchComponent addFilters={_addFilters} />
    </>
  )
}

export default LandingPage
