import React, { useState } from 'react'
import { Autocomplete, Box, Button, Grid, Stack, TextField } from '@mui/material'
import { GOVERNORATES, LOCATIONS } from '../../utils/constants/index'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

interface SearchWarehousesProps {
  addFilters: any
}

const SearchComponent: React.FC<SearchWarehousesProps> = ({ addFilters }) => {
  const [location, setLocation] = useState<string | null>()
  const [governorate, setGovernorate] = useState<string | null>()

  const history = useNavigate()

  const onSubmit = () => {
    addFilters({ location: [location], governorate: [governorate] })
    history('/explore')
  }

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
            id="governorate-input"
            options={GOVERNORATES}
            sx={{ width: 300 }}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
              setGovernorate(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Governorate" />}
          />
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

          <Button onClick={onSubmit} variant="contained" color="primary">
            <SearchIcon sx={{ marginRight: '10px' }} /> Search Warehouses
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default SearchComponent
