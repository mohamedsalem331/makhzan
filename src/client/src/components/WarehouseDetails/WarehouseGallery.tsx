import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, ImageListItem, Grid, useMediaQuery } from '@mui/material'

interface IWarehouseGalleryProps {
  Images: Array<string>
}

const WarehouseGallery: React.FC<IWarehouseGalleryProps> = ({ Images }) => {
  const matches = useMediaQuery('(min-width:800px)')

  return (
    <>
      {matches ? (
        <Grid columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
          <Grid key={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
            <Grid item xs={8}>
              <ImageListItem>
                <img src={Images[0]} srcSet={Images[0]} loading="lazy" alt="" />
              </ImageListItem>
            </Grid>
            {Images.length > 1 && (
              <Grid item xs={4}>
                {Images.slice(1)?.map((img, idx) => {
                  return (
                    <ImageListItem key={idx}>
                      <img src={img} srcSet={img} loading="lazy" alt="" />
                    </ImageListItem>
                  )
                })}
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Swiper
            className="swiper-override-style2"
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop
          >
            {Images.map((image: string, idx) => (
              <SwiperSlide key={idx}>
                <img src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  )
}

export default WarehouseGallery
