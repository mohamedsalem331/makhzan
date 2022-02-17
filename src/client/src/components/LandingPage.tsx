import React from 'react'

import '../styles/LandingPage.css'
import SearchComponent from './Filter/SearchComponent'
import LandingNavbar from './Navbar/NavbarComponent'

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingNavbar />

      <div className="ImageContainer">
        <div className="overlay"></div>
        <div className="main-image"></div>
      </div>
      <SearchComponent />
    </>
  )
}

export default LandingPage
