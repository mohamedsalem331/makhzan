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
  Tooltip,
  IconButton,
} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { useFilteredServices } from '../../app/hooks'
import { UserAttributes, WarehouseAttributes } from '../../types'
import { formatRentValue } from '../../utils/formatNumber'

const DividerComponent: React.FC = (props) => (
  <Divider sx={{ marginY: '22px' }}>
    <Typography variant="h6" component="div">
      {props.children}
    </Typography>
  </Divider>
)

interface WarehouseDetailsProps extends WarehouseAttributes, UserAttributes {}

const WarehouseDescription: React.FC<WarehouseDetailsProps> = ({
  title,
  description,
  rent,
  size,
  governorate,
  location,
  street,
  services,
  createdAt = '1/1/2021',
  name,
  email,
  phoneNumber,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const myServices = useFilteredServices(services)
  const myDate = new Date(createdAt).toUTCString()
  return (
    <>
      <Box sx={{ marginTop: '2rem', textAlign: 'left' }}>
        <Grid columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                {`Warehouse for rent in ${governorate}, ${location}, ${street}.`.toUpperCase()}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 'semi-bold', letterSpacing: '1px' }}
              >
                {title.toUpperCase()}
              </Typography>
              <Typography variant="subtitle1" component="span">
                {`Warehouse Size: ${size} sqm`}
              </Typography>
            </Stack>
            <DividerComponent>Services</DividerComponent>
            <Stack direction={'row'} spacing={3}>
              {myServices.map((service: any, indx: number) => {
                return (
                  <Box key={indx} sx={{ display: 'flex' }}>
                    {<service.Icon />}
                    <Typography
                      sx={{ marginLeft: '10px', marginBottom: '15px' }}
                      variant="body1"
                      component="div"
                    >
                      {service.label.toUpperCase()}
                    </Typography>
                  </Box>
                )
              })}
            </Stack>
            <DividerComponent>Agent Information</DividerComponent>
            <Box sx={{ display: 'flex', flexBasis: 'start' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ width: 56, height: 56 }}>
                  <AccountCircleIcon fontSize="large" />
                </Avatar>
                {name}
                <br />
                {`Created Warehouse on ${myDate}`}
              </Box>
            </Box>
            <DividerComponent>Description</DividerComponent>
            {/* whiteSpace: 'pre-line' */}
            {description}
          </Grid>
          <Grid item xs={4}>
            <Paper
              variant="outlined"
              square
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                height: '11rem',
              }}
              elevation={2}
            >
              <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                {formatRentValue(rent)} EGP / Month
              </Typography>
              <Stack direction="row" spacing={5} sx={{ justifyContent: 'center' }}>
                <Tooltip title={phoneNumber}>
                  <Button variant="contained" onClick={handleClick}>
                    <CallIcon sx={{ marginRight: '10px' }} /> Call
                  </Button>
                </Tooltip>

                <Tooltip title={email} arrow>
                  <Button variant="contained" onClick={handleClick}>
                    <EmailIcon sx={{ marginRight: '10px' }} /> Email
                  </Button>
                </Tooltip>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Button sx={{ marginY: '5rem' }} variant="contained" size="large">
        <ArrowBackIcon fontSize="large" sx={{ marginRight: '10px' }} /> Return Back
      </Button>
    </>
  )
}

export default WarehouseDescription
