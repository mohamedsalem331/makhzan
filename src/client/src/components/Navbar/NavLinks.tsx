import React from 'react'
import { Avatar, Button, Container, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { stringAvatar } from '../../utils/avatarInitials'
import SideMenu from './SideMenu'

interface NavLinksProps {
  Position?: 'absolute' | 'fixed' | 'relative' | 'static'
  isLoggedIn?: boolean
  userName?: string
  logoutUser?: () => Promise<void>
  error?: string
  loading?: boolean
}

const NavLinks: React.FC<NavLinksProps> = ({
  Position = 'relative',
  isLoggedIn,
  userName = 'jack nelson',
  logoutUser,
  loading,
  error,
}) => {
  return (
    <>
      {!!isLoggedIn ? (
        <>
          <Stack direction="row" spacing={2}>
            <Link to="/postwarehouse">
              <Button variant="contained">Post Warehouse</Button>
            </Link>
            <Button onClick={logoutUser} variant="outlined">
              Logout
            </Button>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{stringAvatar(userName)}</Avatar>
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="row" spacing={2}>
            <Link to="login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
            <Link to="register">
              <Button variant="contained">Join Now</Button>
            </Link>
          </Stack>
        </>
      )}
    </>
  )
}

export default NavLinks
