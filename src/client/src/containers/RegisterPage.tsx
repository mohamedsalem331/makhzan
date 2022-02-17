import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Container,
  Grid,
  Divider,
  Link,
  Alert,
  AlertTitle,
} from '@mui/material'
import React, { useState } from 'react'

import '../styles/RegisterPage.css'

interface RegisterState {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
}

const RegisterPage = () => {
  const [values, setValues] = useState<RegisterState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof RegisterState
  ): void => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (): void => {
    console.log('submiited')
    console.log(values)
  }

  const submitDisabled =
    !!values.firstName &&
    !!values.lastName &&
    !!values.email &&
    !!values.password &&
    !!values.phoneNumber

  return (
    <>
      <section className="register-wrapper">
        <Container
          sx={{ backgroundColor: 'white', borderRadius: '5px', paddingY: '2.5rem' }}
          maxWidth="sm"
        >
          <Box>
            <Alert sx={{ marginBottom: '20px' }} severity="success">
              Sign Up and Start Posting your Warehouses for Renting!
            </Alert>

            <FormControl variant="outlined">
              <Grid container rowSpacing={{ sm: 3, md: 5 }} columnSpacing={{ md: 3 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="text-first-name"
                    color="secondary"
                    label="First Name"
                    type="text"
                    error={!values.firstName}
                    required
                    onChange={(e) => handleChange(e, 'firstName')}
                    value={values.firstName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="text-last-name"
                    color="secondary"
                    label="Last Name"
                    type="text"
                    error={!values.lastName}
                    // helperText={showPassword && 'Incorrect entry.'}
                    required
                    onChange={(e) => handleChange(e, 'lastName')}
                    value={values.lastName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="text-email"
                    color="secondary"
                    label="Email"
                    type="email"
                    error={!values.email}
                    required
                    onChange={(e) => handleChange(e, 'email')}
                    value={values.email}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="number-phone-number"
                    color="secondary"
                    label="Phone Number"
                    type="text"
                    error={!values.phoneNumber}
                    required
                    onChange={(e) => handleChange(e, 'phoneNumber')}
                    value={values.phoneNumber}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+20</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="text-password-input"
                    type={showPassword ? 'text' : 'password'}
                    color="secondary"
                    label="password"
                    helperText={'More than 5 characters and contains Atleast 1 alphanumeric'}
                    error={!values.password || !(values.password.length > 5)}
                    required
                    onChange={(e) => handleChange(e, 'password')}
                    value={values.password}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!submitDisabled}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              {/* {error && (
                <Alert sx={{ marginY: '1rem' }} severity="error">
                  This is an error alert — check it out!
                </Alert>
              )} */}
              <Divider sx={{ marginY: '1.5rem' }} color="red" />
              <span>
                Already have an Account? <Link href="/login">Sign In</Link>
              </span>
            </FormControl>
          </Box>
        </Container>
      </section>
    </>
  )
}

export default RegisterPage
