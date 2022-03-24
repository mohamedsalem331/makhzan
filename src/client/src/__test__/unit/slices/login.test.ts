import { UserLoginState } from '../../../slices/UserLoginSlice';
// import { renderWithRedux, fireEvent, screen, render, waitFor, cleanup } from '../utils/redux-test-util'
// import store from '../redux/store'
// import { useDispatch, useSelector } from "react-redux";
// import SearchBox from '../components/SearchBox';
// import * as redux from 'react-redux'
import UserLoginReducer, { login } from '../../../slices/UserLoginSlice'

import axios from "axios";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// jest.mock('axios')


// describe("render redux functionality", () => {
//     let wrapper
//     beforeEach(() => {
//         wrapper = renderWithRedux(<App />, { store })
//     })


//     test('renders learn react link', () => {
//         expect(screen.getByText('Increment')).toHaveTextContent('Increment');
//     });

//     test('renders fdsfds', () => {
//         expect(screen.getByRole('button')).toHaveTextContent('Click Me!')
//     });

//     test('render snapshot', () => {
//         expect(wrapper.asFragment()).toMatchSnapshot()
//     });
// })

const loginState: UserLoginState = {
    name: '',
    email: '',
    phoneNumber: '',
    token: '',
    error: '',
    pending: false
}

export { }

describe("Testing Login Slice Redux", () => {

    test('should return the initial login reducer state', () => {
        expect(UserLoginReducer(undefined, { type: '' })).toEqual(loginState)
    })

    // test('should handle updating login state', () => {
    //     const previousState = loginState

    //     expect(UserLoginReducer(previousState, login({
    //         name: 'Mohamed',
    //         email: 'mohamed@gmail.com',
    //         phoneNumber: '12345',
    //         token: '5543366gg33',
    //     }))).toEqual(
    //         {
    //             name: 'Mohamed',
    //             email: 'mohamed@gmail.com',
    //             phoneNumber: '12345',
    //             token: '5543366gg33',
    //             error: '',
    //             pending: false
    //         }
    //     )
    // })
})
