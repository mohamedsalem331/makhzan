import React, { useEffect, useState } from 'react'
import { Avatar, Button, CircularProgress, Container, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { stringAvatar } from '../../utils/avatarInitials'
import SideMenu from './SideMenu'
import CustomizedSnackBar from '../SnackBarComponent'

interface NavLinksProps {
  Position?: 'absolute' | 'fixed' | 'relative' | 'static'
  isLoggedIn?: boolean
  userName?: string
  logoutUser?: any
  error?: string
  loading?: boolean
  message?: string
}

const NavLinks: React.FC<NavLinksProps> = ({
  Position = 'relative',
  isLoggedIn,
  userName = 'jack nelson',
  logoutUser,
  loading,
  error,
  message,
}) => {
  const [logoutAlert, setLogoutAlert] = useState(false)
  const logoutHandler = () => {
    logoutUser()
    setLogoutAlert(true)
  }
  return (
    <>
      {loading && <CircularProgress color="primary" sx={{ marginY: '0.5rem' }} />}
      {!!message && !isLoggedIn && (
        <CustomizedSnackBar AlertOn={logoutAlert} Message={message} Severity="success" />
      )}
      {!!error && <CustomizedSnackBar AlertOn={true} Message={error} Severity="error" />}

      {!!isLoggedIn ? (
        <>
          <Stack direction="row" spacing={2}>
            <Link to="/postwarehouse">
              <Button variant="contained">Post Warehouse</Button>
            </Link>
            <Button onClick={logoutHandler} variant="outlined">
              Logout
            </Button>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{stringAvatar(userName)}</Avatar>
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="row" spacing={3}>
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="contained">Join Now</Button>
            </Link>
          </Stack>
        </>
      )}
    </>
  )
}

export default NavLinks
