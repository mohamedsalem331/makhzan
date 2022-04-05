import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { fetchWarehouseDetails } from '../slices/WarehouseDetailsSlice'
import LandingNavbar from './LandingNavbar'
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
    if (id) {
      _fetchWarehouseDetails(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const { images } = warehouse

  if (pending) {
    return <div>Fetching...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <LandingNavbar />
      <Container maxWidth="xl" sx={{ marginTop: '5rem' }}>
        <Box>
          <WarehouseGallery Images={images} />
          <WarehouseDescription {...warehouse} {...user} />
        </Box>
      </Container>
    </>
  )
}

export default WarehouseDetailsComponent
