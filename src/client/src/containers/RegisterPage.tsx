import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../slices/UserRegisterSlice'
import { login } from '../slices/UserLoginSlice'
import { LoginState, RegisterState } from '../types/index'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import LandingNavbar from './LandingNavbar'
import CustomizedSnackBar from '../components/SnackBarComponent'

import '../styles/RegisterPage.css'

const RegisterUserr: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { message, error, pending } = useAppSelector((state) => state.userRegister)

  const { token } = useAppSelector((state) => state.userLogin)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _login = (data: LoginState) => dispatch(login(data))
  const _registerUser = (data: RegisterState) => dispatch(registerUser(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================

  let navigate = useNavigate()

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

  const handleClickShowPassword = (): void => setShowPassword(!showPassword)

  const handleSubmit = (): void => {
    _registerUser(values)
      .unwrap()
      .then((originalPromiseResult) => {
        _login(originalPromiseResult)
      })
  }

  useEffect(() => {
    if (!!token) {
      setTimeout(() => {
        navigate('/explore')
      }, 1000)
    }
  }, [token, navigate])

  const submitDisabled =
    !!values.firstName &&
    !!values.lastName &&
    !!values.email &&
    !!values.password &&
    !!values.phoneNumber

  return (
    <>
      <LandingNavbar />

      {!!message && <CustomizedSnackBar AlertOn={true} Message={message} />}
      {!!error && <CustomizedSnackBar AlertOn={true} Message={error} Severity="error" />}

      <section className="auth-wrapper">
        <Container
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
            paddingY: '2rem',
            marginX: '0.35rem',
            marginTop: '4.5rem',
          }}
          maxWidth="sm"
        >
          <Box>
            <Alert sx={{ marginBottom: '20px' }} severity="success">
              Sign Up and Start Posting your Warehouses for Renting!
            </Alert>

            <FormControl variant="outlined">
              <Grid container rowSpacing={3.5} columnSpacing={{ md: 3 }}>
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
                    required
                    onChange={(e) => handleChange(e, 'lastName')}
                    value={values.lastName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!submitDisabled}
                  >
                    Sign Up
                  </Button>
                  {pending && <CircularProgress color="primary" sx={{ marginY: '0.3rem' }} />}
                </Grid>
              </Grid>
              <Divider sx={{ marginY: '1rem' }} color="red" />
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

export default RegisterUserr
