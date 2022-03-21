
// import '@testing-library/jest-dom';
// import App from '../containers/App';
// import { renderWithRedux, fireEvent, screen, render, waitFor, cleanup } from '../utils/redux-test-util'
// import store from '../redux/store'
// import { useDispatch, useSelector } from "react-redux";
// import SearchBox from '../components/SearchBox';
// import * as redux from 'react-redux'
// import axios from "axios";
// import { searchRobotsReducer, robotsListReducer } from '../redux/reducer'
// import { getdata } from '../getData'
// import { setRobots } from '../redux/action'
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

// describe('withFetch', () => {
//     test('fetch works ', async () => {
//         axios.get.mockResolvedValue({ data: ['qq'] });

//         const result = await getdata();


//         expect(result).toEqual([]);
//     })

//     // test('fetch not works ', async () => {
//     //     //given
//     //     const message = "Network Error"
//     //     axios.get.mockRejectedValue(new Error(message));

//     //     //when
//     //     const result = await getdata();

//     //     //then
//     //     expect(result).toEqual([]);
//     // })
// })

// describe('redux reducers', () => {
//     test('should return the initial state', () => {
//         expect(searchRobotsReducer(undefined, {})).toEqual(
//             {
//                 searchField: 'bolbol'
//             }
//         )
//     })

//     test('should return the initial state', () => {
//         expect(robotsListReducer(undefined, {})).toEqual(
//             {
//                 robots: []
//             }
//         )
//     })
// })
