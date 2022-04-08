import React from 'react'
import { Typography, Paper, Button, Stack, useMediaQuery } from '@mui/material'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import SquareFootSharpIcon from '@mui/icons-material/SquareFootSharp'
import DefaultImage from '../../assets/empty.jpg'

import { Box } from '@mui/system'
import { formatRentValue } from '../../utils/format-number'
import { Link } from 'react-router-dom'

import { WarehouseAttributes } from '../../types'

interface IWarehouseComponentProps extends WarehouseAttributes {}

const Warehouse: React.FC<IWarehouseComponentProps> = ({
  title,
  id,
  governorate,
  location,
  rent,
  size,
  images,
  street,
}) => {
  const matches = useMediaQuery('(min-width:800px)')
  const Images = images.length === 0 ? [DefaultImage] : images
  return (
    <>
      <Paper
        variant="outlined"
        square
        sx={{ display: 'flex', flexDirection: matches ? 'row' : 'column' }}
        data-testid="warehouse-node"
      >
        <Box className="warehouse-img-wrapper">
          <img style={{ maxWidth: matches ? '27rem' : '100%' }} src={Images[0]} alt="" />
        </Box>

        <Stack
          direction="column"
          spacing={1.5}
          sx={{ paddingX: '1.5rem', paddingY: '0.5rem', textAlign: 'left', width: '100%' }}
        >
          <Typography variant="h5">{formatRentValue(rent)} EGP / Month</Typography>

          <Typography variant="body2">{title}</Typography>

          <Stack direction={'row'} spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WarehouseOutlinedIcon />
              <Typography variant="body2">Warehouse</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SquareFootSharpIcon />
              <Typography variant="body2">{size} sqm</Typography>
            </Box>
          </Stack>

          <Typography variant="body2">{`${governorate} , ${location} , ${street}`}</Typography>

          <Link to={`/explore/${id}`}>
            <Button sx={{ width: '100%', marginBottom: '1rem' }} variant="contained">
              More Details
            </Button>
          </Link>
        </Stack>
      </Paper>
    </>
  )
}

export default Warehouse
