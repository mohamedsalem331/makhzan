import React, { useEffect, useState } from 'react'
import { Typography, Paper, Button, Skeleton, Stack } from '@mui/material'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import SquareFootSharpIcon from '@mui/icons-material/SquareFootSharp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box } from '@mui/system'
import Image1 from '../../Assets/image1.jpeg'
import Image2 from '../../Assets/image2.jpeg'
import Image3 from '../../Assets/image3.jpeg'
import { formatRentValue } from '../../utils/formatNumber'

import '../../styles/WarehouseList.css'
import 'swiper/css'
import { Link } from 'react-router-dom'

const SwiperImageHeight = '180'

export interface IWarehousesListState {
  fetchWarehouses: any
  warehouses: Array<object>
  loading: boolean
  error: string
}

const WarehouseList: React.FC<IWarehousesListState> = ({
  fetchWarehouses,
  warehouses,
  loading,
  error,
}) => {
  useEffect(() => {
    fetchWarehouses()
  }, [])

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
    <>
      <Stack spacing={5}>
        {warehouses.map(({ title, id, governorate, location, rent, size, images, street }: any) => {
          return (
            <>
              <Box sx={{ maxWidth: '90%' }} key={id}>
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
                    {images.map((image: string) => (
                      <SwiperSlide>
                        <img height={SwiperImageHeight} src={image} alt="" />
                      </SwiperSlide>
                    ))}
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
                      {formatRentValue(rent)} EGP / Month
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {title}
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
                          {size} sqm
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {governorate + ', ' + location + ', ' + street}
                    </Typography>
                    <Link to={`/warehouses/${id}`}>
                      <Button sx={{ marginBottom: '0.5rem' }} variant="contained">
                        More Details
                      </Button>
                    </Link>
                  </Box>
                </Paper>
              </Box>
            </>
          )
        })}
      </Stack>
    </>
  )
}

export default WarehouseList

//  <Stack spacing={4}>
// <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//   <Card sx={{ display: 'flex', direction: 'row', borderRadius: '1px', maxWidth: '80rem' }}>
//     <img height={SwiperImageHeight} src={Image1} alt="" />
// {/* <Swiper
//   className="swiper-override-style"
//   spaceBetween={0}
//   slidesPerView={1}
//   onSlideChange={() => console.log('slide change')}
//   onSwiper={(swiper) => console.log(swiper)}
//   pagination={{ clickable: true }}
//   loop
// >
//   <SwiperSlide>
//     <img height={SwiperImageHeight} src={Image1} alt="" />
//   </SwiperSlide>
//   <SwiperSlide>
//     <img height={SwiperImageHeight} src={Image2} alt="" />
//   </SwiperSlide>
//   <SwiperSlide>
//     <img height={SwiperImageHeight} src={Image3} alt="" />
//   </SwiperSlide>
// </Swiper> */}
//     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//       <CardContent>
// <Typography gutterBottom variant="h5" component="div">
//   3,150,000
// </Typography>
// <Typography variant="body2" color="text.secondary">
//   hadayek el ahraam, street 105, apartment 15
// </Typography>
//       </CardContent>

//       <Button size="small">Share</Button>
//       <Button size="small">Learn More</Button>
//     </Box>
//   </Card>
// </Box>
// </Stack>
