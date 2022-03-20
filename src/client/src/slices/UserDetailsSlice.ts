import { localStorageHandler } from './../utils/localStorage';
import { createSlice } from '@reduxjs/toolkit'


const { getTokenLocalStorage, setTokenLocalStorage } = localStorageHandler()


export interface UserDetailsState {
    name: string
    email: string
    phoneNumber: string
    token: string

}

// initialState from local storage
// const getlocStorage = getTokenLocalStorage()
// let userData

// if (getlocStorage) {
//     userData = JSON.parse(getlocStorage)
// } else {
//     userData = {
//         name: '',
//         email: '',
//         phoneNumber: '',
//         token: ''
//     }
// }


const initialState: UserDetailsState = {
    name: '',
    email: '',
    phoneNumber: '',
    token: ''
}

export const UserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {

        // logout(state) {
        //     state.isAuthenticated = false;
        // },
    },
})




export default UserDetailsSlice.reducer

