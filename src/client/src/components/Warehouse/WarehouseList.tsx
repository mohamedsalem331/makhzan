import React from 'react'
import { Skeleton, Stack } from '@mui/material'

import { Box } from '@mui/system'

import '../../styles/WarehouseList.css'
import 'swiper/css'
import { WarehouseAttributes } from '../../types'
import Warehouse from './Warehouse'

export interface IWarehousesListState {
  warehouses: object[]
  loading: boolean
  error: string
}

const WarehouseList: React.FC<IWarehousesListState> = ({ warehouses = [], loading, error }) => {
  if (loading) {
    return (
      <>
        {warehouses.map(() => {
          return (
            <>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={150} height={150} />
                  <Skeleton variant="rectangular" width={600} height={140} />
                </Box>
              </Stack>
            </>
          )
        })}
      </>
    )
  }

  if (warehouses.length === 0) {
    return <div>No warehouses to Display</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <Stack spacing={5}>
        {warehouses.map((warehouse: any) => {
          return (
            <div key={warehouse?.id}>
              <Box sx={{ maxWidth: '100%' }}>
                <Warehouse {...warehouse} />
              </Box>
            </div>
          )
        })}
      </Stack>
    </>
  )
}

export default WarehouseList
