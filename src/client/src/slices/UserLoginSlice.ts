

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoginState } from '../types/index'



export interface UserLoginState {
    name: string
    email: string
    phoneNumber: string
    token: string
    error: string
    pending: boolean
}

const initialState: UserLoginState = {
    name: '',
    email: '',
    phoneNumber: '',
    token: '',
    error: '',
    pending: false
}

const authUser = createAsyncThunk('users/login', async (user: LoginState, thunkAPI) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users/login`,
            data: user
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const UserLoginSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.pending = true
            })
            .addCase(authUser.fulfilled, (state, action) => {
                return (state = {
                    token: action.payload.token,
                    name: action.payload.name,
                    email: action.payload.email,
                    phoneNumber: action.payload.phoneNumber,
                    error: '',
                    pending: false
                });
            })
            .addCase(authUser.rejected, (state, action: PayloadAction<any>) => {
                state.pending = false
                state.error = action.payload.error
            })
    },
})

export { authUser }

export default UserLoginSlice.reducer
