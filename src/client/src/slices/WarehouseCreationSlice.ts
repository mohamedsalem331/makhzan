import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface WarehouseCreationState {
    message: string
    error: string
    pending: boolean
}

const initialState: WarehouseCreationState = {
    message: '',
    error: '',
    pending: false,
}


const postWarehouse = createAsyncThunk('warehouses/create', async (token, thunkAPI) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/warehouses/create`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data.error)
    }
})

export const warehouseCreationSlice = createSlice({
    name: 'warehousePosting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postWarehouse.pending, (state) => {
                state.pending = true
            })
            .addCase(postWarehouse.fulfilled, (state, action) => {
                return (state = {
                    message: action.payload.message,
                    error: '',
                    pending: false,
                });
            })
            .addCase(postWarehouse.rejected, (state, action: PayloadAction<any>) => {
                return (state = {
                    message: '',
                    error: action.payload.error,
                    pending: false,
                });
            })
    },
})

export { postWarehouse }

export default warehouseCreationSlice.reducer
