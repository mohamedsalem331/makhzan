import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'

export interface WarehouseDeleteState {
    message: string
    error: string
    pending: boolean
}

const initialState: WarehouseDeleteState = {
    message: '',
    error: '',
    pending: false,
}

const token = '4354dfgdft543'
let headers = {}
if (!!token) {
    headers = {
        Authorization: `Bearer ${token}`,
    }
}


const deleteWarehouse = createAsyncThunk('warehouses/delete', async (id, thunkAPI) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5000/warehouses/${id}`,
            headers
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data.error)
    }
})

export const warehouseDeleteSlice = createSlice({
    name: 'warehouseDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteWarehouse.pending, (state) => {
                state.pending = true
            })
            .addCase(deleteWarehouse.fulfilled, (state, action) => {
                return (state = {
                    message: action.payload.message,
                    error: '',
                    pending: false,
                });
            })
            .addCase(deleteWarehouse.rejected, (state, action: PayloadAction<any>) => {
                console.log(action)
                return (state = {
                    message: '',
                    error: action.payload.error,
                    pending: false,
                });
            })
    },
})

export { deleteWarehouse }

export default warehouseDeleteSlice.reducer
