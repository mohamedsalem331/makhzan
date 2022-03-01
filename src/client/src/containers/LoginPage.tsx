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
  CircularProgress,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import React, { useState } from 'react'
import { authUser } from '../slices/UserLoginSlice'
import { LoginState } from '../types/index'
import CustomizedSnackBar from '../components/SnackBarComponent'

const LoginPage: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token, name, email, phoneNumber, error, pending } = useAppSelector(
    (state) => state.userLogin
  )

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()
  const _authUser = (data: LoginState) => dispatch(authUser(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================
  const [values, setValues] = useState<LoginState>({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof LoginState
  ): void => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = (): void => setShowPassword(!showPassword)

  const handleSubmit = (): void => {
    console.log('submiited')
    _authUser(values)
  }

  const submitDisabled = !!values.email && !!values.password

  return (
    <>
      {!!token && <CustomizedSnackBar AlertOn={true} Message="Login Successful" />}
      {!!error && <CustomizedSnackBar AlertOn={true} Message={error} Severity="error" />}
      <section className="register-wrapper">
        <Container
          sx={{ backgroundColor: 'white', borderRadius: '5px', paddingY: '2.5rem' }}
          maxWidth="sm"
        >
          <Box>
            <FormControl variant="outlined">
              <Grid container rowSpacing={{ sm: 3, md: 5 }} columnSpacing={{ md: 3 }}>
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
              {/* {error && (
                <Alert sx={{ marginY: '1rem' }} severity="error">
                  This is an error alert — check it out!
                </Alert>
              )} */}
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
