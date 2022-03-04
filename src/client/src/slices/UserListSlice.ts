import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface UserListState {
    users: Array<object>
    error: string
    pending: boolean
}

const initialState: UserListState = {
    users: [],
    error: '',
    pending: false,
}


const fetchUsersList = createAsyncThunk('users/fetch', async (token, thunkAPI) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const UserListSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersList.pending, (state) => {
                state.pending = true
            })
            .addCase(fetchUsersList.fulfilled, (state, action) => {
                return (state = {
                    users: [],
                    error: '',
                    pending: false,
                });
            })
            .addCase(fetchUsersList.rejected, (state, action: PayloadAction<any>) => {
                return (state = {
                    users: [],
                    error: action.payload.error,
                    pending: false,
                });
            })
    },
})

export { fetchUsersList }

export default UserListSlice.reducer
