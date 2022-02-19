import React, { useState } from 'react'
import { Typography, Paper, Button, Skeleton, Stack } from '@mui/material'
import { Box } from '@mui/system'

import WarehouseComponent from './WarehouseComponent'
import 'swiper/css'
import '../../styles/WarehouseList.css'

const WarehouseList = () => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <WarehouseComponent />
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
