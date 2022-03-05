import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'

export interface WarehousesListState {
  warehouses: Array<object>
  error: string
  pending: boolean
  maxRent?: number | null
  maxSize?: number | null
}

const initialState: WarehousesListState = {
  warehouses: [],
  error: '',
  pending: false,
  maxRent: 0,
  maxSize: 0,
}

const id = ''
let headers = {}
if (!!id) {
  headers = {
    UserId: id,
  }
}

const fetchWarehouses = createAsyncThunk('warehouses/fetch', async (_, thunkAPI) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:5000/warehouses`,
      headers
    })
    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.error)
  }
})

export const warehousesListSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.pending = true
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        return (state = {
          warehouses: [...action.payload.warehouses],
          error: '',
          pending: false,
          maxRent: action.payload.maxRent,
          maxSize: action.payload.maxSize,
        });
      })
      .addCase(fetchWarehouses.rejected, (state, action: PayloadAction<any>) => {
        console.log(action)
        return (state = {
          warehouses: [],
          error: action.payload.error,
          pending: false,
        });
      })
  },
})

export { fetchWarehouses }


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default warehousesListSlice.reducer
