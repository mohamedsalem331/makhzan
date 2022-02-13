import React from 'react'

import '../styles/LandingPage.css'
import SearchComponent from './Filter/SearchComponent'
import LandingNavbar from './Navbar/LandingNavbar'

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="landingnavbar-container">
        <div className="landingnavbar-wrapper">
          <LandingNavbar />
        </div>
      </div>
      <div className="ImageContainer">
        <div className="overlay"></div>
        <div className="main-image"></div>
      </div>
      <SearchComponent />
    </>
  )
}

export default LandingPage
