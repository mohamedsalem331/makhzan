import { TextField, Autocomplete, Stack, InputAdornment } from '@mui/material'

import React from 'react'
import { Box } from '@mui/system'
import { GOVERNORATES, LOCATIONS } from '../../utils/constants/constants'

const FilterComponent = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const [filteredGovernorates, setGovernorates] = React.useState<string[]>([])
  const [filteredLocations, setLocations] = React.useState<string[]>([])
  const [value, setValue] = React.useState('')
  const [personName, setPersonName] = React.useState<string[]>([])

  const handlePanelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleFilterChange = (filterId: string) => (event: any) => {
    const filterArray = filterId === 'governorates' ? filteredGovernorates : filteredLocations

    let arr: string[] = filterArray

    const exists = filterArray.includes(event.target.textContent)

    if (exists) {
      arr = filterArray.filter((item) => {
        return item !== event.target.textContent
      })
    } else {
      arr = [...filterArray, event.target.textContent]
    }

    if (filterId === 'governorates') {
      setGovernorates(arr)
    } else {
      setLocations(arr)
    }
  }

  const handleChangetext = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const myNewLocations = LOCATIONS.slice(0, 10)

  return (
    <>
      {/* <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="governorate-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Governorate</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: '15rem', overflowY: 'scroll' }}></AccordionDetails>
      </Accordion> */}

      <Stack sx={{ textAlign: 'left' }} spacing={5}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={GOVERNORATES}
          getOptionLabel={(option) => option}
          defaultValue={[GOVERNORATES[2]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
          )}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={LOCATIONS}
          getOptionLabel={(option) => option}
          defaultValue={[LOCATIONS[2]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
          )}
        />
        <Box>
          Size
          <Stack sx={{ marginTop: '2rem' }} spacing={1} direction={'row'}>
            <TextField
              id="outlined-multiline-flexible"
              label="Min"
              onChange={handleChangetext}
              defaultValue={0}
              InputProps={{
                startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Max"
              onChange={handleChangetext}
              InputProps={{
                startAdornment: <InputAdornment position="start">sqm</InputAdornment>,
              }}
            />
          </Stack>
        </Box>

        <Box>
          Rent
          <Stack sx={{ marginTop: '2rem' }} spacing={1} direction={'row'}>
            <TextField
              id="outlined-multiline-flexible"
              label="Min"
              onChange={handleChangetext}
              defaultValue={0}
              InputProps={{
                startAdornment: <InputAdornment position="start">E£</InputAdornment>,
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Max"
              onChange={handleChangetext}
              InputProps={{
                startAdornment: <InputAdornment position="start">E£</InputAdornment>,
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  )
}

export default FilterComponent
