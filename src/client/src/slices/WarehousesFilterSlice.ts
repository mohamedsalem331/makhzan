import { BasedApiUrl } from './../api/BaseUrl';
import { FilterWarehouseOptions } from './../types/index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface WarehousesFilterState {
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

// -> clear array from any null values or empty strings
const cleanArr = (arr: Array<string>) => {
    return arr.filter(gov => gov)
}

const filterWarehouses = createAsyncThunk('warehouses/filter', async (filterOptions: FilterWarehouseOptions, thunkAPI) => {
    const { rent, size, governorates: govs, locations: locs } = filterOptions

    const governorates = cleanArr(govs)
    const locations = cleanArr(locs)

    try {
        const response = await axios({
            method: 'post',
            url: `${BasedApiUrl}/warehouses`,
            data: {
                governorates,
                locations,
                rent,
                size

            }
        })
        console.log(response);
        return response.data
    } catch (err: any) {

        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const warehousesFilterSlice = createSlice({
    name: 'warehouseFilter',
    initialState,
    reducers: {
        addFilters: (state, action: PayloadAction<FilterWarehouseOptions>) => {
            state.governorates = action.payload.governorates
            state.locations = action.payload.locations
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

                return (state = {
                    filteredWarehouses: [...action.payload.warehouses],
                    error: '',
                    pending: false,
                    governorates: [],
                    locations: [],
                    rent: [0, 0],
                    size: [0, 0],
                });

            })
            .addCase(filterWarehouses.rejected, (state, action: PayloadAction<any>) => {

                state.error = action.payload.error
                state.pending = false
            })
    },
})

const { addFilters, clearFilters } = warehousesFilterSlice.actions

export { filterWarehouses, addFilters, clearFilters }

export default warehousesFilterSlice.reducer
