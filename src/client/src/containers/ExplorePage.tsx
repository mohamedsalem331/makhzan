import { Box, Container, Grid, Switch, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import FilterComponent from '../components/Filter/FilterComponent'
import LandingNavbar from './LandingNavbar'
import WarehouseList from '../components/WarehousesList/WarehousesList'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { addFilters, clearFilters, filterWarehouses } from '../slices/WarehousesFilterSlice'
import { FilterWarehouseOptions } from '../types/index'
import { fetchWarehouses } from '../slices/WarehousesListSlice'

const ExplorePage: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const {
    warehouses,
    error: errWarehouses,
    pending: loadingWarehouses,
  } = useAppSelector((state: RootState) => state.warehousesList)

  const { filteredWarehouses, governorates, locations, size, rent } = useAppSelector(
    (state: RootState) => state.warehousesFilter
  )

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

  const [filterOpen, setFilterOpen] = React.useState<boolean>(true)

  const mySize = size && size[0] + size[1] > 0
  const myRent = rent && rent[0] + rent[1] > 0
  const filters = governorates.length > 0 || locations.length > 0 || mySize || myRent

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilterOpen(event.target.checked)

  useEffect(() => {
    if (filters) {
      _filterWarehouses({ locations, governorates, size, rent })
    } else {
      _fetchWarehouses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [governorates, locations, size, rent])

  const warehousesList: any = filters ? filteredWarehouses : warehouses
  const matches = useMediaQuery('(min-width:1000px)')

  return (
    <>
      <LandingNavbar />
      <Container>
        <Box sx={{ marginY: '3rem', width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                Filter Warehouses
              </Typography>

              {!matches && (
                <Switch color="secondary" checked={filterOpen} onChange={handleChange} />
              )}
              {filterOpen && (
                <FilterComponent
                  clearFilters={_clearFilters}
                  addFilters={_addFilters}
                  governorates={governorates}
                  locations={locations}
                />
              )}
            </Grid>
            <Grid item xs={12} lg={9}>
              <Typography gutterBottom variant="h5" sx={{ marginY: '1rem' }}>
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

export default ExplorePage
