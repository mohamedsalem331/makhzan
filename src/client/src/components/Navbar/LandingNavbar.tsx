import React, { useState } from 'react'
import Logo from '../Logo'
import { Box } from '@mui/system'
import { Avatar, Button, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

const LandingNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  const stringAvatar = (str: string) => {
    const myArr = str.split(' ')
    let letter = ''

    if (myArr[1]) {
      letter = myArr[0].slice(0, 1) + myArr[1].slice(0, 1)
    } else {
      letter = myArr[0].slice(0, 1)
    }

    if (letter.length === 0) {
      return 'NN'
    }

    return letter.toUpperCase()
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <Logo />
        </Link>
        {isLoggedIn ? (
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
        ) : (
          <>
            <Stack direction="row" spacing={7}>
              <Button variant="contained">Logout</Button>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{stringAvatar('jack nelson')}</Avatar>
            </Stack>
          </>
        )}
      </Box>
    </>
  )
}

export default LandingNavbar
