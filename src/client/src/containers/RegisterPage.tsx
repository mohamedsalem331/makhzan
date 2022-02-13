import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Container,
  Grid,
  Divider,
  Link,
} from '@mui/material'
import React, { useState } from 'react'

interface RegisterState {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: number | null
}

const RegisterPage = () => {
  const [values, setValues] = useState<RegisterState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: null,
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // (prop: keyof RegisterState) =>
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof RegisterState
  ): void => {
    setValues({ ...values, [prop]: event.target.value })
    // console.log(keyof RegisterState);
  }

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ margin: '50px' }}>
          {/* <FormControl variant="outlined"></FormControl> */}

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                id="demo-helper-text-misaligned1"
                label="First Name"
                type="text"
                required
                onChange={(e) => handleChange(e, 'firstName')}
                value={values.firstName}
                sx={{}}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                color="secondary"
                error={showPassword}
                helperText={showPassword && 'Incorrect entry.'}
                id="demo-helper-text-misaligned2"
                label="Last Name"
                type="text"
                required
                onChange={(e) => handleChange(e, 'lastName')}
                value={values.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                color="secondary"
                error={showPassword}
                helperText={showPassword && 'Incorrect entry.'}
                id="demo-helper-text-misaligned3"
                label="Email"
                type="email"
                required
                onChange={(e) => handleChange(e, 'email')}
                value={values.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Passworddddddddd</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(e) => handleChange(e, 'password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button fullWidth variant="contained" color="primary">
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Divider color="red" />
          <span>
            Already on Makhzan? <Link href="/login">Sign In</Link>
          </span>
          <Divider color="red" />
        </Box>
      </Container>
    </>
  )
}

export default RegisterPage
