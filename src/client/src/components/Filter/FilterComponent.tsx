import React from 'react'
import { TextField, Autocomplete, Stack, InputAdornment, Paper, Button } from '@mui/material'
import { Box } from '@mui/system'

import { GOVERNORATES, LOCATIONS } from '../../utils/constants'
import { FilterWarehouseOptions } from '../../types'

interface IFilterWarehousesState {
  locations: string[]
  governorates: string[]
  addFilters: (filters: FilterWarehouseOptions) => void
  clearFilters: () => void
}

const FilterComponent: React.FC<IFilterWarehousesState> = ({
  governorates,
  locations,
  addFilters,
  clearFilters,
}) => {
  // ===========================================================================
  // Hooks
  // ===========================================================================

  const [filteredGovernorates, setGovernorates] = React.useState<string[]>([...governorates])
  const [filteredLocations, setLocations] = React.useState<string[]>([...locations])
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

  const handleFilterGovernorates = (event: React.SyntheticEvent<Element, Event>, value: string[]) =>
    setGovernorates(value)

  const handleFilterLocations = (event: React.SyntheticEvent<Element, Event>, value: string[]) =>
    setLocations(value)

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

  const handleApplyFilters = () => {
    const Filters = {
      governorates: filteredGovernorates,
      locations: filteredLocations,
      size: [size.minSize, size.maxSize],
      rent: [rent.minRent, rent.maxRent],
    }

    addFilters(Filters)
  }

  const handleClearFilters = () => {
    setGovernorates([])
    setLocations([])
    setSize({ minSize: 0, maxSize: 0 })
    setRent({ minRent: 0, maxRent: 0 })

    clearFilters()
  }

  return (
    <>
      <Paper sx={{ p: 2 }} variant="outlined" square>
        <Stack sx={{ textAlign: 'left' }} spacing={5}>
          <Autocomplete
            multiple
            value={filteredGovernorates}
            onChange={handleFilterGovernorates}
            id="governorates-filter"
            options={GOVERNORATES}
            autoHighlight
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Filter Governorates" placeholder="Governorates" />
            )}
          />
          <Autocomplete
            multiple
            value={filteredLocations}
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
            <Stack sx={{ marginTop: '2rem' }} spacing={2} direction={'column'}>
              <TextField
                id="minSize"
                label="Min"
                type="number"
                onChange={handleChangeSize}
                value={size.minSize}
                InputProps={{
                  startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
                }}
                inputProps={{
                  'data-testid': 'min-size-input',
                }}
              />
              <TextField
                id="maxSize"
                label="Max"
                type="number"
                onChange={handleChangeSize}
                value={size.maxSize}
                InputProps={{
                  startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
                }}
                inputProps={{
                  'data-testid': 'max-size-input',
                }}
              />
            </Stack>
          </Box>

          <Box>
            Rent
            <Stack sx={{ marginTop: '2rem' }} spacing={2} direction={'column'}>
              <TextField
                id="minRent"
                label="Min"
                type="number"
                onChange={handleChangeRent}
                value={rent.minRent}
                InputProps={{
                  startAdornment: <InputAdornment position="start">E£</InputAdornment>,
                }}
              />
              <TextField
                id="maxRent"
                label="Max"
                type="number"
                onChange={handleChangeRent}
                value={rent.maxRent}
                InputProps={{
                  startAdornment: <InputAdornment position="start">E£</InputAdornment>,
                }}
              />
            </Stack>
          </Box>
        </Stack>
        <Stack spacing={1} sx={{ marginTop: '3rem' }}>
          <Button variant="contained" fullWidth onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" fullWidth onClick={handleClearFilters}>
            Remove Filters
          </Button>
        </Stack>
      </Paper>
    </>
  )
}

export default FilterComponent
