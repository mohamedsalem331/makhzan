import React from 'react'
import { Typography, Paper, Button, Stack, useMediaQuery } from '@mui/material'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import SquareFootSharpIcon from '@mui/icons-material/SquareFootSharp'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Box } from '@mui/system'
import { formatRentValue } from '../../utils/formatNumber'
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
  const matches = useMediaQuery('(min-width:700px)')

  const SwiperImageHeight = matches ? '180' : '450'

  return (
    <>
      <Paper
        variant="outlined"
        square
        sx={{ display: 'flex', flexDirection: matches ? 'row' : 'column' }}
      >
        <Swiper
          className="swiper-override-style"
          spaceBetween={0}
          slidesPerView={1}
          pagination={true}
          loop
        >
          {images.map((image: string, idx: number) => (
            <SwiperSlide key={idx}>
              <img height={SwiperImageHeight} src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Stack
          direction="column"
          spacing={1.5}
          sx={{ paddingX: '1rem', textAlign: 'left', width: '100%' }}
        >
          <Typography variant="h5" component="div">
            {formatRentValue(rent)} EGP / Month
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WarehouseOutlinedIcon />
              <Typography variant="body2" color="text.secondary">
                Warehouse
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SquareFootSharpIcon />
              <Typography variant="body2" color="text.secondary">
                {size} sqm
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {governorate + ', ' + location + ', ' + street}
          </Typography>
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
