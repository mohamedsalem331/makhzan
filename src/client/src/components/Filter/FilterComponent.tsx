import { TextField, Autocomplete, Stack, InputAdornment, Paper } from '@mui/material'

import React from 'react'
import { Box } from '@mui/system'
import { GOVERNORATES, LOCATIONS } from '../../utils/constants'
import { formatRentValue } from '../../utils/formatNumber'

interface FilterWarehousesState {
  locations: string[]
  governorates: string[]
}

const FilterComponent: React.FC<FilterWarehousesState> = ({ governorates, locations }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const [filteredGovernorates, setGovernorates] = React.useState<string[]>([])
  const [filteredLocations, setLocations] = React.useState<string[]>([])
  const [value, setValue] = React.useState('')
  const [rent, setRent] = React.useState([0,50])
  console.log(filteredGovernorates)
  console.log(filteredLocations)

  const handleFilterChange = (event: any, value: any) => {
    if (event.target.id.includes('governorates')) {
      setGovernorates(value)
    } else if (event.target.id.includes('locations')) {
      setLocations(value)
    }
  }

  const handleChangeRent = (event: any) => {
    console.log(event)
    const target = event.target
    if (target.id === 'minRent') {
      setRent[]
    }
  }

  const myNewLocations = LOCATIONS.slice(0, 10)

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
          {/* <Box>
            Size
            <Stack sx={{ marginTop: '2rem' }} spacing={1} direction={'row'}>
              <TextField
                id="outlined-multiline-flexible"
                label="Min"
                type="number"
                onChange={handleChangetext}
                defaultValue={0}
                InputProps={{
                  startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Max"
                type="number"
                onChange={handleChangetext}
                InputProps={{
                  startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
                }}
              />
            </Stack>
          </Box> */}

          <Box>
            Rent
            <Stack sx={{ marginTop: '2rem' }} spacing={1} direction={'row'}>
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
                type="text"
                onChange={handleChangeRent}
                InputProps={{
                  startAdornment: <InputAdornment position="start">E£</InputAdornment>,
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </>
  )
}

export default FilterComponent
