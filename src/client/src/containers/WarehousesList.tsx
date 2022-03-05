import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import FilterComponent from '../components/Filter/FilterComponent'
import LandingNavbar from '../components/Navbar/NavbarComponent'
import WarehouseListComponent from '../components/Warehouse/WarehouseListComponent'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { filterWarehouses } from '../slices/WarehousesFilterSlice'
import { FilterWarehouseOptions } from '../types/index'
import { fetchWarehouses } from '../slices/WarehousesListSlice'

const WarehousesList: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const {
    governorates,
    locations,
    error: errFilters,
    pending: loadingFilters,
  } = useAppSelector((state: RootState) => state.warehousesFilter)

  const {
    warehouses,
    error: errWarehouses,
    pending: loadingWarehouses,
    maxRent,
    maxSize,
  } = useAppSelector((state: RootState) => state.warehousesList)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()
  const _filterWarehouses = (data: FilterWarehouseOptions) => dispatch(filterWarehouses(data))
  const _fetchWarehouses = () => dispatch(fetchWarehouses())

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
              <FilterComponent
                filterWarehouses={_filterWarehouses}
                governorates={governorates}
                locations={locations}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                {warehouses.length + ' Warehouses for Renting'}
              </Typography>
              <WarehouseListComponent
                fetchWarehouses={_fetchWarehouses}
                warehouses={warehouses}
                loading={loadingWarehouses}
                error={errWarehouses}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default WarehousesList
