import { TextField, Autocomplete, Stack, InputAdornment, Paper, Button } from '@mui/material'

import React from 'react'
import { Box } from '@mui/system'
import { GOVERNORATES, LOCATIONS } from '../../utils/constants'
import { formatRentValue } from '../../utils/formatNumber'

interface FilterWarehousesState {
  locations: string[]
  governorates: string[]
  filterWarehouses: any
}

const FilterComponent: React.FC<FilterWarehousesState> = ({
  governorates,
  locations,
  filterWarehouses,
}) => {
  // ===========================================================================
  // Hooks
  // ===========================================================================

  const [filteredGovernorates, setGovernorates] = React.useState<string[]>([])
  const [filteredLocations, setLocations] = React.useState<string[]>([])
  const [size, setSize] = React.useState({ minSize: 0, maxSize: 0 })
  const [rent, setRent] = React.useState({ minRent: 0, maxRent: 0 })

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleFilterChange = (event: any, value: any) => {
    const { id } = event.target

    if (id.includes('governorates')) {
      setGovernorates(value)
    } else if (id.includes('locations')) {
      setLocations(value)
    }
  }

  const handleChangeRent = (event: any) => {
    const { value, id } = event.target

    if (id === 'minRent') {
      setRent({
        minRent: value,
        maxRent: rent.maxRent,
      })
    } else if (id === 'maxRent') {
      setRent({
        minRent: rent.minRent,
        maxRent: value,
      })
    }
  }

  const handleChangeSize = (event: any) => {
    const { value, id } = event.target

    if (id === 'minSize') {
      setSize({
        minSize: value,
        maxSize: size.maxSize,
      })
    } else if (id === 'maxSize') {
      setSize({
        minSize: size.maxSize,
        maxSize: value,
      })
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    const Filters = {
      governorate: filteredGovernorates,
      location: filteredLocations,
      size: [size.minSize, size.maxSize],
      rent: [rent.minRent, rent.maxRent],
    }

    filterWarehouses(Filters)
  }

  return (
    <>
      <Paper sx={{ p: 2 }} variant="outlined" square>
        <Stack sx={{ textAlign: 'left' }} spacing={5}>
          <Autocomplete
            multiple
            onChange={handleFilterChange}
            id="governorates-filter"
            options={GOVERNORATES}
            getOptionLabel={(option) => option}
            defaultValue={governorates.length > 0 ? [governorates[0]] : []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Filter Governorates" placeholder="Governorates" />
            )}
          />
          <Autocomplete
            multiple
            onChange={handleFilterChange}
            id="locations-filter"
            options={LOCATIONS}
            getOptionLabel={(option) => option}
            defaultValue={locations.length > 0 ? [locations[0]] : []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Filter Locations" placeholder="Locations" />
            )}
          />
          <Box>
            Size
            <Stack sx={{ marginTop: '2rem' }} spacing={1} direction={'column'}>
              <TextField
                id="minSize"
                label="Min"
                type="number"
                onChange={handleChangeSize}
                defaultValue={0}
                InputProps={{
                  startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
                }}
              />
              <TextField
                id="maxSize"
                label="Max"
                type="number"
                onChange={handleChangeSize}
                InputProps={{
                  startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
                }}
              />
            </Stack>
          </Box>

          <Box>
            Rent
            <Stack sx={{ marginTop: '2rem' }} spacing={1} direction={'column'}>
              <TextField
                id="minRent"
                label="Min"
                type="number"
                onChange={handleChangeRent}
                defaultValue={0}
                InputProps={{
                  startAdornment: <InputAdornment position="start">E£</InputAdornment>,
                }}
              />
              <TextField
                id="maxRent"
                label="Max"
                type="number"
                onChange={handleChangeRent}
                InputProps={{
                  startAdornment: <InputAdornment position="start">E£</InputAdornment>,
                }}
              />
            </Stack>
          </Box>
          <Button variant="contained">Apply Filters</Button>
          <Button variant="outlined">Remove Filters</Button>
        </Stack>
      </Paper>
    </>
  )
}

export default FilterComponent
