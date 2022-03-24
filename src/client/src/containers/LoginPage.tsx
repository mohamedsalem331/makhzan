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
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { authUser } from '../slices/UserLoginSlice'
import { LoginState } from '../types/index'
import CustomizedSnackBar from '../components/SnackBarComponent'
import LandingNavbar from './LandingNavbar'

const LoginPage: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token, error, pending, name } = useAppSelector((state) => state.userLogin)

  if (window.location.pathname === '' || window.location.pathname === '/') {
  }

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _authUser = (data: LoginState) => dispatch(authUser(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================

  let navigate = useNavigate()

  const [values, setValues] = useState<LoginState>({
    email: 'admin1@example.com',
    password: 'ffdsfsd545431',
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof LoginState
  ): void => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = (): void => setShowPassword(!showPassword)

  const handleSubmit = (): void => {
    _authUser(values)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  useEffect(() => {
    if (!!token) {
      navigate('/')
    }
  }, [token, navigate])

  const submitDisabled = !!values.email && !!values.password
  // const matches = useMediaQuery('(min-width:500px)')

  return (
    <>
      <LandingNavbar />
      {!!token && <CustomizedSnackBar AlertOn={true} Message="Login Successful" />}
      {!!error && <CustomizedSnackBar AlertOn={true} Message={error} Severity="error" />}
      <section className="auth-wrapper">
        <Container
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
            paddingY: '2.5rem',
            marginX: '0.5rem',
          }}
          maxWidth="sm"
        >
          <Box>
            <FormControl variant="outlined">
              <Grid container rowSpacing={{ xs: 3, sm: 5 }} columnSpacing={{ xs: 4 }}>
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
                    id="text-password-input"
                    type={showPassword ? 'text' : 'password'}
                    color="secondary"
                    label="password"
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
                    Sign In
                  </Button>
                  {pending && <CircularProgress color="primary" sx={{ marginY: '0.5rem' }} />}
                </Grid>
              </Grid>
              <Divider sx={{ marginY: '1.5rem' }} color="red" />
              <span>
                Dont have an Account? <Link href="/register">Sign Up</Link>
              </span>
            </FormControl>
          </Box>
        </Container>
      </section>
    </>
  )
}

export default LoginPage
