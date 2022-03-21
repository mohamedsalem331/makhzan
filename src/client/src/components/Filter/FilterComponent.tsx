import { TextField, Autocomplete, Stack, InputAdornment, Paper, Button } from '@mui/material'

import React from 'react'
import { Box } from '@mui/system'
import { GOVERNORATES, LOCATIONS } from '../../utils/constants'
import { formatRentValue } from '../../utils/formatNumber'

interface FilterWarehousesState {
  locations: string[]
  governorates: string[]
  filterWarehouses: any
  addFilters: any
  clearFilters: any
}

const FilterComponent: React.FC<FilterWarehousesState> = ({
  governorates,
  locations,
  addFilters,
  clearFilters,
  filterWarehouses,
}) => {
  // ===========================================================================
  // Hooks
  // ===========================================================================

  const [filteredGovernorates, setGovernorates] = React.useState<string[]>([])
  const [filteredLocations, setLocations] = React.useState<string[]>([])
  const [size, setSize] = React.useState<{ minSize: number; maxSize: number }>({
    minSize: 0,
    maxSize: 0,
  })
  const [rent, setRent] = React.useState<{ minRent: number; maxRent: number }>({
    minRent: 0,
    maxRent: 0,
  })

  // ===========================================================================
  // Handlers
  // ===========================================================================
  // if (id.includes('governorates')) {     const { id } = event.target

  //   setGovernorates(value)
  // } else if (id.includes('locations')) {
  //   setLocations(value)
  // } else {
  //   setGovernorates(value)
  //   setLocations(value)
  // }
  const handleFilterGovernorates = (event: any, value: any) => {
    setGovernorates(value)
  }

  const handleFilterLocations = (event: any, value: any) => {
    setLocations(value)
  }

  const handleChangeRent = (event: any) => {
    const { value, id } = event.target

    if (id === 'minRent') {
      setRent({
        minRent: Number(value),
        maxRent: Number(rent.maxRent),
      })
    } else if (id === 'maxRent') {
      setRent({
        minRent: Number(rent.minRent),
        maxRent: Number(value),
      })
    }
  }
  console.log(size)

  const handleChangeSize = (event: any) => {
    const { value, id } = event.target

    if (id === 'minSize') {
      setSize({
        minSize: Number(value),
        maxSize: Number(size.maxSize),
      })
    } else if (id === 'maxSize') {
      setSize({
        minSize: Number(size.minSize),
        maxSize: Number(value),
      })
    }
  }

  const onSubmit = () => {
    const Filters = {
      governorate: filteredGovernorates,
      location: filteredLocations,
      size: [size.minSize, size.maxSize],
      rent: [rent.minRent, rent.maxRent],
    }

    addFilters(Filters)

    // filterWarehouses(Filters)
  }

  return (
    <>
      <Paper sx={{ p: 2 }} variant="outlined" square>
        <Stack sx={{ textAlign: 'left' }} spacing={5}>
          <Autocomplete
            multiple
            onChange={handleFilterGovernorates}
            id="governorates-filter"
            options={GOVERNORATES}
            getOptionLabel={(option) => option}
            defaultValue={!!governorates[0] ? [governorates[0]] : []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Filter Governorates" placeholder="Governorates" />
            )}
          />
          <Autocomplete
            multiple
            onChange={handleFilterLocations}
            id="locations-filter"
            options={LOCATIONS}
            getOptionLabel={(option) => option}
            defaultValue={!!locations[0] ? [locations[0]] : []}
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
          <Button variant="contained" onClick={onSubmit}>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={clearFilters}>
            Remove Filters
          </Button>
        </Stack>
      </Paper>
    </>
  )
}

export default FilterComponent
