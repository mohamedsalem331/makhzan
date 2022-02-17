import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image1 from '../../Assets/image1.jpeg'
import Image2 from '../../Assets/image2.jpeg'
import Image3 from '../../Assets/image3.jpeg'
import 'swiper/css'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Stack,
} from '@mui/material'
import { Box, flexbox } from '@mui/system'

import '../../styles/WarehouseList.css'

const SwiperImageHeight = '200'

const WarehouseList = () => {
  return (
    <>
      <Stack spacing={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ display: 'flex', direction: 'row', maxWidth: 820, borderRadius: '1px' }}>
            <Swiper
              className="swiper-override-style"
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true }}
              loop
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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 0 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>

              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </Box>
          </Card>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ display: 'flex', maxWidth: 820, borderRadius: '1px' }}>
            <Swiper
              className="swiper-override-style"
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true }}
              loop
            >
              <SwiperSlide>
                <img height="230" src={Image1} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img height="180" src={Image2} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img height="180" src={Image3} alt="" />
              </SwiperSlide>
            </Swiper>
            <Box sx={{ display: 'flex', direction: 'column' }}>
              <CardContent sx={{ p: 0 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Stack>
      {/* <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        loop
      >
        <SwiperSlide>
          <img height="300rem" src={Image1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img height="300rem" src={Image2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img height="300rem" src={Image3} alt="" />
        </SwiperSlide>
      </Swiper> */}
    </>
  )
}

export default WarehouseList
