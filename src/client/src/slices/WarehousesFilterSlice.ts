import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface FilterWarehouseOptions {
    governorates: Array<string>
    locations: Array<string>
    rent?: Array<number>
    size?: Array<number>
}

interface WarehousesFilterState extends FilterWarehouseOptions {
    filteredWarehouses: Array<object>
    error: string
    pending: boolean
}


const initialState: WarehousesFilterState = {
    filteredWarehouses: [],
    governorates: [],
    locations: [],

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
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const warehousesFilterSlice = createSlice({
    name: 'warehouseFilter',
    initialState,
    reducers: {
        searchFilter: (state, action: PayloadAction<{ governorate: string, location: string }>) => {
            state.governorates = [action.payload.governorate]
            state.locations = [action.payload.location]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterWarehouses.pending, (state) => {
                state.pending = true
            })
            .addCase(filterWarehouses.fulfilled, (state, action: PayloadAction<{ warehouses: Array<object> }>) => {
                state.filteredWarehouses = [...action.payload.warehouses]
                state.pending = false

            })
            .addCase(filterWarehouses.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error
                state.pending = false
            })
    },
})

const { searchFilter } = warehousesFilterSlice.actions

export { filterWarehouses, searchFilter }

export default warehousesFilterSlice.reducer
