import { Box, Container, Grid, Switch, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterComponent from '../components/Filter/FilterComponent'
import LandingNavbar from './NavbarComponent'
import WarehouseList from '../components/Warehouse/WarehouseList'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { addFilters, clearFilters, filterWarehouses } from '../slices/WarehousesFilterSlice'
import { FilterWarehouseOptions } from '../types/index'
import { fetchWarehouses } from '../slices/WarehousesListSlice'

const WarehousesList: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const {
    filteredWarehouses,
    governorates,
    locations,
    size,
    rent,
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
  const _clearFilters = () => dispatch(clearFilters())
  const _addFilters = (data: any) => dispatch(addFilters(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================
  const mySize = size && size[0] + size[1] > 0
  const myRent = rent && rent[0] + rent[1] > 0

  const filters = governorates.length > 0 || locations.length > 0 || mySize || myRent

  const [filterOpen, setFilterOpen] = React.useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked)

    setFilterOpen(event.target.checked)
  }

  useEffect(() => {
    if (filters) {
      _filterWarehouses({ locations, governorates, size, rent })
    } else {
      _fetchWarehouses()
    }
  }, [governorates, locations, size, rent])

  const warehousesList: any = filters ? filteredWarehouses : warehouses
  const matches = useMediaQuery('(min-width:950px)')
  console.log(matches)

  return (
    <>
      <LandingNavbar />

      <Container>
        <Box sx={{ marginY: '3rem', width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                Filter Warehouses
              </Typography>
              {!matches && (
                <Switch color="secondary" checked={filterOpen} onChange={handleChange} />
              )}
              {filterOpen && (
                <FilterComponent
                  filterWarehouses={_filterWarehouses}
                  clearFilters={_clearFilters}
                  addFilters={_addFilters}
                  governorates={governorates}
                  locations={locations}
                />
              )}
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                {warehousesList.length + ' Warehouses for Renting'}
              </Typography>
              <WarehouseList
                warehouses={warehousesList}
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
