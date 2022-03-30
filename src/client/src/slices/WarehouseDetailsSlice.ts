import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { WarehouseAttributes, UserAttributes } from '../types'

export interface WarehousesDetailsState {
    warehouse: WarehouseAttributes
    user: UserAttributes
    error: string
    pending: boolean
}

const initialState: WarehousesDetailsState = {
    warehouse: {
        title: '',
        description: '',
        size: 0,
        rent: 0,
        governorate: '',
        location: '',
        street: '',
        services: [],
        images: [],
    },
    user: {
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    },
    error: '',
    pending: false,
}


const fetchWarehouseDetails = createAsyncThunk('warehouses/details', async (id: string, thunkAPI) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5000/warehouses/${id}`,
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const warehouseDetailsSlice = createSlice({
    name: 'warehouseDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWarehouseDetails.pending, (state) => {
                state.pending = true
            })
            .addCase(fetchWarehouseDetails.fulfilled, (state, action) => {

                return (state = {
                    warehouse: action.payload.warehouse,
                    user: action.payload.user,
                    error: '',
                    pending: false,
                });
            })
            .addCase(fetchWarehouseDetails.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error
                state.pending = false
            })
    },
})

export { fetchWarehouseDetails }

export default warehouseDetailsSlice.reducer
