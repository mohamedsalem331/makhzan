import React from 'react'
import { Skeleton, Stack } from '@mui/material'

import Warehouse from './Warehouse'
import { Box } from '@mui/system'

import '../../styles/Warehouse.css'

export interface IWarehousesListState {
  warehouses: object[]
  loading: boolean
  error: string
}

const WarehousesList: React.FC<IWarehousesListState> = ({ warehouses = [], loading, error }) => {
  if (loading) {
    return (
      <>
        <h1>Loading</h1>
        {warehouses.map((warehouse, index) => {
          return (
            <Stack spacing={1} key={index}>
              <Box
                data-testid="skeleton-nodes"
                sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
              >
                <Skeleton variant="circular" width={150} height={150} />
                <Skeleton variant="rectangular" width={600} height={140} />
              </Box>
            </Stack>
          )
        })}
      </>
    )
  }

  if (warehouses.length === 0 && !error) {
    return <div>No warehouses to Display</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div data-testid="warehouses-nodes">
        <Stack spacing={5}>
          {warehouses.map((warehouse: any, idx) => {
            return (
              <div key={warehouse?.id ?? idx}>
                <Box>
                  <Warehouse {...warehouse} />
                </Box>
              </div>
            )
          })}
        </Stack>
      </div>
    </>
  )
}

export default WarehousesList
