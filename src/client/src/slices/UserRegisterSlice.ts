import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RegisterState } from '../types/index'

export interface UserRegisterState {
    message: string
    token: string
    name: string
    email: string
    phoneNumber: string
    error: string
    pending: boolean
}

const initialState: UserRegisterState = {
    message: '',
    token: '',
    name: '',
    email: '',
    phoneNumber: '',
    error: '',
    pending: false
}


const registerUser = createAsyncThunk('users/register', async (data: RegisterState, thunkAPI) => {
    const { firstName, lastName, email, password, phoneNumber } = data

    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users/register`,
            data: { name: `${firstName} ${lastName}`, email, password, phoneNumber }
        })
        return response.data
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const UserRegisterSlice = createSlice({
    name: 'userRegister',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.pending = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                return (state = {
                    message: action.payload.message,
                    token: action.payload.token,
                    name: action.payload.name,
                    email: action.payload.email,
                    phoneNumber: action.payload.phoneNumber,
                    error: '',
                    pending: false
                });
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.pending = false
                state.error = action.payload.error
            })
    },
})

export { registerUser }

export default UserRegisterSlice.reducer
