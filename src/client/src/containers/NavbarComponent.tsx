import React, { useState } from 'react'
import Logo from '../components/Navbar/Logo'
import { Box } from '@mui/system'
import { Avatar, Button, Container, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { logoutUser } from '../slices/UserLogoutSlice'
import { localStorageHandler } from '../utils/localStorage'
import { logout } from '../slices/UserLoginSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import '../styles/LandingNavbar.css'
import NavLinks from '../components/Navbar/NavLinks'
import SideMenu from '../components/Navbar/SideMenu'
const LandingNavbar: React.FC = () => {
  const { removeTokenLocalStorage } = localStorageHandler()
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token, name } = useAppSelector((state) => state.userLogin)
  const { message, pending, error } = useAppSelector((state) => state.userLogout)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _logoutUser = () =>
    dispatch(logoutUser(token))
      .unwrap()
      .then(() => {
        dispatch(logout())
        removeTokenLocalStorage()
      })

  const isLoggedIn = !!token

  const Position =
    window.location.pathname === '/' || window.location.pathname === '' ? 'absolute' : 'relative'

  const matches = useMediaQuery('(min-width:750px)')

  const ImgSize = matches ? undefined : 2.5
  return (
    <>
      <div className="landingnavbar-container" style={{ position: Position }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">
              <Logo ImgSize={ImgSize} />
            </Link>
            {matches ? (
              <NavLinks
                isLoggedIn={isLoggedIn}
                userName={name}
                logoutUser={_logoutUser}
                error={error}
                loading={pending}
                Position="absolute"
                message={message}
              />
            ) : (
              <SideMenu />
            )}
          </Box>
        </Container>
      </div>
    </>
  )
}

export default LandingNavbar
