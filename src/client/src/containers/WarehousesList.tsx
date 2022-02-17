import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import FilterComponent from '../components/Filter/FilterComponent'
import LandingNavbar from '../components/Navbar/NavbarComponent'
import WarehouseListComponent from '../components/Warehouse/WarehouseListComponent'

const WarehousesList: React.FC = () => {
  return (
    <>
      <LandingNavbar Position="relative" />
      <Container sx={{ height: '100vh' }}>
        <Box sx={{ marginY: '3rem', width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FilterComponent />
            </Grid>
            <Grid item xs={9}>
              <WarehouseListComponent />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default WarehousesList
