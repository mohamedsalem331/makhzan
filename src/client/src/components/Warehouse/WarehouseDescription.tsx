import React, { useState } from 'react'
import {
  Box,
  Container,
  ImageListItem,
  Avatar,
  Grid,
  Typography,
  Divider,
  Paper,
  Button,
  Stack,
} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'
import PowerIcon from '@mui/icons-material/Power'
import WcIcon from '@mui/icons-material/Wc'
import WifiIcon from '@mui/icons-material/Wifi'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { filteredServices } from '../../utils/filterServices'

const DividerComponent: React.FC = (props) => (
  <Divider sx={{ marginY: '10px' }}>
    <Typography variant="h6" component="div">
      {props.children}
    </Typography>
  </Divider>
)

const WarehouseDescription: React.FC = () => {
  const myServices = filteredServices(['Wifi', 'Thermostat'])
  return (
    <>
      <Box sx={{ marginTop: '2rem', textAlign: 'left' }}>
        <Grid columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
          <Grid item xs={8}>
            <Typography variant="body2" color="text.secondary">
              {'APARTMENT FOR SALE IN MIVIDA, 5TH SETTLEMENT COMPOUNDS'.toUpperCase()}
            </Typography>
            <Typography variant="h5" component="div">
              fully finish apartment at mivida emaar low price
            </Typography>
            <DividerComponent>Services</DividerComponent>
            {myServices.map(({ label, Icon }, indx: number) => {
              return (
                <Box key={indx} sx={{ display: 'flex' }}>
                  {<Icon />}
                  <Typography
                    sx={{ marginLeft: '10px', marginBottom: '15px' }}
                    variant="body1"
                    component="div"
                  >
                    {label.toUpperCase()}
                  </Typography>
                </Box>
              )
            })}
            <DividerComponent>Agent Information</DividerComponent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                <Avatar sx={{ width: 56, height: 56 }}>
                  <AccountCircleIcon fontSize="large" />
                </Avatar>
                haidy ahmed
              </div>
            </Box>
            <DividerComponent>Description</DividerComponent>
            {/* whiteSpace: 'pre-line' */}
            apartment for sale in mivida emaar new cairo with very special finishing at lowest price
            in market compound : mivida one of the luxuries compounds in new cairo , it contain all
          </Grid>
          <Grid item xs={4}>
            <Paper
              variant="outlined"
              square
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                height: '13rem',
              }}
              elevation={2}
            >
              <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                3,150,000 EGP / Month
              </Typography>
              <Stack direction="row" spacing={5} sx={{ justifyContent: 'center' }}>
                <Button variant="contained">
                  <CallIcon sx={{ marginRight: '10px' }} /> Call
                </Button>
                <Button variant="contained">
                  <EmailIcon sx={{ marginRight: '10px' }} /> Email
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default WarehouseDescription
