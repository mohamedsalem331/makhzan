import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ height: '100vh' }}>
        <Stack
          direction="column"
          spacing={5}
          justifyContent="center"
          alignItems="center"
          sx={{ height: '60%' }}
        >
          <Typography variant="h1">Oops!</Typography>

          <Typography variant="h3">We can't seem to find the page you're looking for.</Typography>

          <Link to="/">
            <Button variant="contained" fullWidth>
              Return To Home
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  )
}

export default NotFoundPage
