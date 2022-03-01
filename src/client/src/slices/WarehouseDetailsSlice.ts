import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'

export interface WarehousesDetailsState {
    warehouse: object
    error: string
    pending: boolean
}

const initialState: WarehousesDetailsState = {
    warehouse: {},
    error: '',
    pending: false,
}


const fetchWarehouseDetails = createAsyncThunk('warehouses/details', async (id, thunkAPI) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5000/warehouses/${id}`,
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data.error)
    }
})

export const warehouseDetailsSlice = createSlice({
    name: 'warehouseDetails',
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //   state.value += action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWarehouseDetails.pending, (state) => {
                state.pending = true
            })
            .addCase(fetchWarehouseDetails.fulfilled, (state, action) => {
                return (state = {
                    warehouse: action.payload.warehouse,
                    error: '',
                    pending: false,
                });
            })
            .addCase(fetchWarehouseDetails.rejected, (state, action: PayloadAction<any>) => {
                console.log(action)
                return (state = {
                    warehouse: {},
                    error: action.payload.error,
                    pending: false,
                });
            })
    },
})

export { fetchWarehouseDetails }

export default warehouseDetailsSlice.reducer
