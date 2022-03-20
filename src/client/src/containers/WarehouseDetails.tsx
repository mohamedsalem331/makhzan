import React, { useEffect } from 'react'
import { Box, Container, ImageListItem, Grid, useMediaQuery } from '@mui/material'
import BreadCrumbsLinks from '../components/BreadCrumbsLinks'
import Image1 from '../Assets/image1.jpeg'
import Image2 from '../Assets/image2.jpeg'
import Image3 from '../Assets/image3.jpeg'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { fetchWarehouseDetails } from '../slices/WarehouseDetailsSlice'
import LandingNavbar from './NavbarComponent'
import WarehouseDescription from '../components/Warehouse/Description'
import { useParams } from 'react-router-dom'
import { Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

const WarehouseDetailsComponent: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { warehouse, user, error, pending } = useAppSelector(
    (state: RootState) => state.warehouseDetails
  )

  // ===========================================================================
  // Actions
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _fetchWarehouseDetails = (data: string) => dispatch(fetchWarehouseDetails(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================

  let { id } = useParams()

  useEffect(() => {
    if (id) _fetchWarehouseDetails(id)
  }, [])

  const matches = useMediaQuery('(min-width:800px)')
  const { images } = warehouse

  if (pending) {
    return <div>Fetching...</div>
  }

  if (error) {
    return <div>Couldnt Fetch warehouse details</div>
  }

  return (
    <>
      <Container maxWidth="xl">
        <BreadCrumbsLinks text="fds" link="/" />
        <Box>
          {matches ? (
            <Grid columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
              <Grid key={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
                <Grid item xs={8}>
                  <ImageListItem>
                    <img src={images[0]} srcSet={images[0]} alt={'fdsdsfds'} loading="lazy" />
                  </ImageListItem>
                </Grid>
                <Grid item xs={4}>
                  {images.map((img, idx) => {
                    if (idx > 0) {
                      return (
                        <ImageListItem key={idx}>
                          <img src={img} srcSet={img} alt={'fdsdsfds'} loading="lazy" />
                        </ImageListItem>
                      )
                    }
                  })}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Swiper
                className="swiper-override-style2"
                modules={[Pagination]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop
              >
                {images.map((image: string) => (
                  <SwiperSlide>
                    <img src={image} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}

          <WarehouseDescription {...warehouse} {...user} />
        </Box>
      </Container>
    </>
  )
}

// {
// 	"warehouse": {
// 		"id": "edf914ed-17e2-42de-a7a5-e89f34ebee04",
// 		"title": "Warehouse 1500 SQM licensed Food & Beverage",
// 		"description": "Warehouse for Rent in New Cairo Alf Masnaa Area.Spa",
// 		"size": 1500,
// 		"rent": 150000,
// 		"governorate": "cairo",
// 		"location": "6 october city",
// 		"street": "112",
// 		"services": [
// 			"wifi",
// 			"iot",
// 			"bathroom"
// 		],
// 		"images": [
// 			"https://res.cloudinary.com/makhzan/image/upload/v1643349711/cld-sample.jpg"
// 		],
// 		"UserId": "3322718c-a785-4e0d-be7d-2b28f3079a4f",
// 		"createdAt": "2022-02-08T17:14:25.050Z",
// 		"updatedAt": "2022-02-08T17:14:25.050Z"
// 	}
// }

export default WarehouseDetailsComponent
