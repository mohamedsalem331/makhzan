import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import FilterComponent from '../components/Filter/FilterComponent'
import LandingNavbar from '../components/Navbar/NavbarComponent'
import WarehouseListComponent from '../components/Warehouse/WarehouseListComponent'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'

const WarehousesList: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const warehousesList = useAppSelector((state: RootState) => state.warehousesList)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  // ===========================================================================
  // Hooks
  // ===========================================================================

  const [incrementAmount, setIncrementAmount] = useState('2')

  return (
    <>
      <LandingNavbar Position="relative" />
      <Container sx={{ height: '100vh' }}>
        <Box sx={{ marginY: '3rem', width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                Filter Warehouses
              </Typography>
              <FilterComponent />
            </Grid>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                Warehouses for Renting
              </Typography>
              <WarehouseListComponent />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default WarehousesList
