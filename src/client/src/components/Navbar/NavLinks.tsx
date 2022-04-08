import React from 'react'
import { Avatar, Button, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

import { stringAvatar } from '../../utils/avatar-initials'

interface NavLinksProps {
  isLoggedIn?: boolean
  userName?: string
  logoutUser?: () => void
}

const NavLinks: React.FC<NavLinksProps> = ({
  isLoggedIn,
  userName = 'jack nelson',
  logoutUser,
}) => {
  const logoutHandler = () => {
    if (logoutUser) logoutUser()
  }
  return (
    <>
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
