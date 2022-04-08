import React, { useState } from 'react'
import { Box } from '@mui/system'
import { CircularProgress, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'

import Logo from '../components/Navbar/Logo'
import CustomizedSnackBar from '../components/SnackBarComponent'
import NavLinks from '../components/Navbar/NavLinks'
import SideMenu from '../components/Navbar/SideMenu'
import { logout } from '../slices/UserLoginSlice'
import { logoutUser } from '../slices/UserLogoutSlice'
import { localStorageHandler } from '../utils/local-storage-handlers'
import { useAppDispatch, useAppSelector } from '../app/hooks'

const { removeTokenLocalStorage } = localStorageHandler()

const LandingNavbar: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token, name } = useAppSelector((state) => state.userLogin)
  const { message, pending, error } = useAppSelector((state) => state.userLogout)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const [logoutAlert, setLogoutAlert] = useState(false)

  const dispatch = useAppDispatch()

  const _logoutUser = () =>
    dispatch(logoutUser(token))
      .unwrap()
      .then(() => {
        dispatch(logout())
        removeTokenLocalStorage()
        setLogoutAlert(true)
      })

  const isLoggedIn = !!token

  const Position =
    window.location.pathname === '/' || window.location.pathname === '' ? 'absolute' : 'relative'

  const matches = useMediaQuery('(min-width:750px)')

  const ImgSize = matches ? undefined : 2.5

  return (
    <>
      {!!message && !isLoggedIn && (
        <CustomizedSnackBar AlertOn={logoutAlert} Message={message} Severity="success" />
      )}
      {!!error && <CustomizedSnackBar AlertOn={true} Message={error} Severity="error" />}
      <Box
        sx={{
          position: Position,
          backgroundColor: '#0000002c',
          zIndex: 1,
          width: '100%',
          p: '20px',
        }}
      >
        {pending && <CircularProgress color="primary" sx={{ marginY: '0.5rem' }} />}
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">
              <Logo ImgSize={ImgSize} />
            </Link>
            {matches ? (
              <NavLinks isLoggedIn={isLoggedIn} userName={name} logoutUser={_logoutUser} />
            ) : (
              <SideMenu isLoggedIn={isLoggedIn} logoutUser={_logoutUser} userName={name} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default LandingNavbar
