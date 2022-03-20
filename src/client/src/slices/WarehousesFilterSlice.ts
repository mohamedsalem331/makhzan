import { FilterWarehouseOptions } from './../types/index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'



interface WarehousesFilterState {
    filteredWarehouses: Array<object>
    governorates: Array<string>
    locations: Array<string>
    rent?: Array<number>
    size?: Array<number>
    error: string
    pending: boolean
}


const initialState: WarehousesFilterState = {
    filteredWarehouses: [],
    governorates: [],
    locations: [],
    rent: [0, 0],
    size: [0, 0],
    error: '',
    pending: false,
}

const cleanArr = (arr: Array<string>) => {
    if (!arr[0]) {
        return arr.filter(gov => gov)
    }
}

const filterWarehouses = createAsyncThunk('warehouses/filter', async (filterOptions: FilterWarehouseOptions, thunkAPI) => {
    const { rent, size, governorates: govs, locations: locs } = filterOptions

    const governorates = cleanArr(govs)
    const locations = cleanArr(locs)

    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/warehouses`,
            data: {
                governorates,
                locations,
                rent,
                size

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
        addFilters: (state, action: PayloadAction<{ governorate: string[], location: string[], rent?: number[], size?: number[] }>) => {
            state.governorates = action.payload.governorate
            state.locations = action.payload.location
            state.rent = action.payload.rent
            state.size = action.payload.size
        },
        clearFilters: (state) => {
            state.governorates = []
            state.locations = []
            state.rent = [0, 0]
            state.size = [0, 0]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterWarehouses.pending, (state) => {
                state.pending = true
            })
            .addCase(filterWarehouses.fulfilled, (state, action: PayloadAction<any>) => {
                state.filteredWarehouses = [...action.payload.warehouses]
                state.pending = false

            })
            .addCase(filterWarehouses.rejected, (state, action: PayloadAction<any>) => {
                console.log(action);

                state.error = 'error'
                state.pending = false
            })
    },
})

const { addFilters, clearFilters } = warehousesFilterSlice.actions

export { filterWarehouses, addFilters, clearFilters }

export default warehousesFilterSlice.reducer
