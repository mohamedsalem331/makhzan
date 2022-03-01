import React, { useState } from 'react'
import { Autocomplete, Box, Button, Grid, Stack, TextField } from '@mui/material'
import { GOVERNORATES, LOCATIONS } from '../../utils/constants/index'
import SearchIcon from '@mui/icons-material/Search'

const SearchComponent: React.FC = () => {
  const [locationInput, setLocation] = useState<string | null>(null)
  const [governorateInput, setGovernorate] = useState<string | null>(null)
  console.log('fds')

  return (
    <div>
      <Box
        sx={{
          p: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: ' translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '20px',
          display: 'flex',
        }}
      >
        <Stack spacing={3}>
          <Autocomplete
            disablePortal
            id="location-input"
            options={LOCATIONS}
            sx={{ width: 300 }}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
              setLocation(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
          <Autocomplete
            disablePortal
            id="governorate-input"
            options={GOVERNORATES}
            sx={{ width: 300 }}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
              setGovernorate(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Governorate" />}
          />
          <Button variant="contained" color="primary">
            <SearchIcon sx={{ marginRight: '10px' }} /> Search Warehouses
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default SearchComponent
