import { localStorageHandler } from './../utils/localStorage';
import { createSlice } from '@reduxjs/toolkit'


const { getTokenLocalStorage } = localStorageHandler()


export interface UserDetailsState {
    name: string
    email: string
    phoneNumber: string
    token: string
}

// initialState from local storage
const getlocStorage = getTokenLocalStorage()
let userData

if (getlocStorage) {
    userData = JSON.parse(getlocStorage)
} else {
    userData = {}
}

const { name, email, phoneNumber, token } = userData

const initialState: UserDetailsState = {
    name,
    email,
    phoneNumber,
    token,
}

export const UserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {},
})

export default UserDetailsSlice.reducer

