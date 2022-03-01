import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface UserDeleteState {
    message: string
    error: string
    pending: boolean
}

const initialState: UserDeleteState = {
    message: '',
    error: '',
    pending: false
}

const deleteUser = createAsyncThunk('users/delete', async (admin: { id: string, token: string }, thunkAPI) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users/delete${admin.id}`,
            headers: {
                Authorization: `Bearer ${admin.token}`,
            }
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data.error)
    }
})

export const WarehouseDeleteSlice = createSlice({
    name: 'userDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.pending = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                return (state = {
                    message: action.payload.message,
                    error: '',
                    pending: false
                });
            })
            .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
                state.pending = true
                state.error = action.payload.error
            })
    },
})

export { deleteUser }

export default WarehouseDeleteSlice.reducer
