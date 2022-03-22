import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { fetchWarehouseDetails } from '../slices/WarehouseDetailsSlice'
import LandingNavbar from './Navbar'
import WarehouseDescription from '../components/WarehouseDetails/Description'
import { useParams } from 'react-router-dom'

import WarehouseGallery from '../components/WarehouseDetails/WarehouseGallery'

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

  const { images } = warehouse

  if (pending) {
    return <div>Fetching...</div>
  }

  if (error) {
    return <div>Couldnt Fetch warehouse details</div>
  }

  return (
    <>
      <LandingNavbar />
      <Container maxWidth="xl">
        <Box>
          <WarehouseGallery Images={images} />
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
