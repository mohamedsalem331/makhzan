import React, { useState } from 'react'
import Logo from '../Logo'
import { Box } from '@mui/system'
import { Avatar, Button, Container, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

import '../../styles/LandingNavbar.css'

interface NavbarProps {
  Position?: 'absolute' | 'fixed' | 'relative' | 'static'
}

const LandingNavbar: React.FC<NavbarProps> = ({ Position = 'absolute' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

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
      <div className="landingnavbar-container" style={{ position: Position }}>
        <Container maxWidth="xl">
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
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" size="small">
                    Post Warehouse
                  </Button>
                  <Button variant="outlined">Logout</Button>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>{stringAvatar('jack nelson')}</Avatar>
                </Stack>
              </>
            )}
          </Box>
        </Container>
      </div>
    </>
  )
}

export default LandingNavbar
