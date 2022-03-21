import { RootState } from './../app/store';
import { localStorageHandler } from './../utils/localStorage'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoginState } from '../types/index'

const { getTokenLocalStorage, setTokenLocalStorage, removeTokenLocalStorage } = localStorageHandler()

// initialState from local storage
const getlocStorage = getTokenLocalStorage()
let userData = {
    name: '',
    email: '',
    phoneNumber: '',
    token: ''
}

if (getlocStorage && !!getlocStorage) {
    userData = JSON.parse(getlocStorage)
}



export interface UserLoginState {
    name: string
    email: string
    phoneNumber: string
    token: string
    error: string
    pending: boolean
}

const initialState: UserLoginState = {
    ...userData,
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
    reducers: {
        login(state, action) {
            state.name = action.payload.name
            state.email = action.payload.email
            state.phoneNumber = action.payload.phoneNumber
            state.token = action.payload.token
        },
        logout(state) {
            state.token = ''
        },
    },
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

const { login, logout } = UserLoginSlice.actions


const authMiddleware = () => (next: any) => (action: any) => {
    const result = next(action)

    if (login.match(result) || result.type.includes('login/fulfilled')) {
        setTokenLocalStorage(result.payload)
    } else if (logout.match(result) || result.type.includes('logout/fulfilled')) {
        removeTokenLocalStorage()
    }

    return next(action);
};


export { authMiddleware }


export { authUser, login, logout }

export default UserLoginSlice.reducer
