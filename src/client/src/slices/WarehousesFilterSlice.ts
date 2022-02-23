import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface WarehousesFilterState {
    filteredWarehouses: Array<object>
    error: string
    pending: boolean
}

interface FilterWarehouseOptions {
    governorate: Array<string>
    services: Array<string>
    rent?: Array<number>
    size?: Array<number>
}

const initialState: WarehousesFilterState = {
    filteredWarehouses: [],
    error: '',
    pending: false,
}

const filterWarehouses = createAsyncThunk('warehouses/filter', async (filterOptions: FilterWarehouseOptions, thunkAPI) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/warehouses`,
            data: {
                ...filterOptions
            }
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data.error)
    }
})

export const warehousesFilterSlice = createSlice({
    name: 'warehousePosting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(filterWarehouses.pending, (state) => {
                state.pending = true
            })
            .addCase(filterWarehouses.fulfilled, (state, action) => {
                return (state = {
                    filteredWarehouses: action.payload.warehouses,
                    error: '',
                    pending: false,
                });
            })
            .addCase(filterWarehouses.rejected, (state, action: PayloadAction<any>) => {
                return (state = {
                    filteredWarehouses: [],
                    error: action.payload.error,
                    pending: false,
                });
            })
    },
})

export { filterWarehouses }

export default warehousesFilterSlice.reducer
