import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

interface IWarehouseGalleryProps {
  Images: Array<string>
}

const WarehouseGallery: React.FC<IWarehouseGalleryProps> = ({ Images }) => {
  const matches = useMediaQuery('(min-width:800px)')

  const imageStyle = { width: '900px', maxWidth: '950px', height: 'auto' }

  return (
    <>
      {matches ? (
        <Box>
          <Splide
            options={{
              rewind: true,
              autoplay: true,
              speed: 800,
              interval: 2000,
              pauseOnFocus: true,
            }}
          >
            {Images.map((image: string, idx) => (
              <SplideSlide key={idx}>
                <img style={imageStyle} src={image} alt="" />
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      ) : (
        <Box>
          <Splide
            options={{
              rewind: true,
              autoplay: true,
              speed: 800,
              interval: 2000,
              pauseOnFocus: true,
            }}
          >
            {Images.map((image: string, idx) => (
              <SplideSlide key={idx}>
                <img src={image} alt="" />
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      )}
    </>
  )
}

export default WarehouseGallery
