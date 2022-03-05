import React, { useState } from 'react'
import { Typography, Paper, Button, Skeleton, Stack } from '@mui/material'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import SquareFootSharpIcon from '@mui/icons-material/SquareFootSharp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box } from '@mui/system'
import Image1 from '../../Assets/image1.jpeg'
import Image2 from '../../Assets/image2.jpeg'
import Image3 from '../../Assets/image3.jpeg'

const SwiperImageHeight = '180'

const WarehouseComponent = () => {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Skeleton variant="circular" width={150} height={150} />
          <Skeleton variant="rectangular" width={600} height={140} />
        </Box>
      </Stack>
    )
  }

  return (
    <div>
      <Box sx={{ maxWidth: '90%' }}>
        <Paper variant="outlined" square sx={{ display: 'flex', flexDirection: 'row' }}>
          <Swiper
            className="swiper-override-style"
            spaceBetween={0}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            pagination={true}
            loop
            navigation
          >
            <SwiperSlide>
              <img height={SwiperImageHeight} src={Image1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img height={SwiperImageHeight} src={Image2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img height={SwiperImageHeight} src={Image3} alt="" />
            </SwiperSlide>
          </Swiper>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              justifyContent: 'space-around',
              marginX: '1rem',
              width: '100%',
            }}
          >
            <Typography variant="h5" component="div">
              3,150,000 EGP / Month
            </Typography>
            <Typography variant="body2" color="text.secondary">
              fully finish apartment at mivida emaar low price emaar low price
            </Typography>
            <Box
              sx={{
                maxWidth: '50%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarehouseOutlinedIcon />
                <Typography variant="body2" color="text.secondary">
                  Warehouse
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFootSharpIcon />
                <Typography variant="body2" color="text.secondary">
                  152 sqm
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              hadayek el ahraam, street 105, apartment 15
            </Typography>
            <Button sx={{ marginBottom: '0.5rem' }} variant="contained">
              More Details
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default WarehouseComponent
