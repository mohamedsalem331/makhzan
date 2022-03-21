// // test-utils.jsx
// import React from 'react'
// import { render } from '@testing-library/react'
// import { Provider } from 'react-redux'
// // Import your own reducer
// import rootReducer from '../redux/rootReducer'
// import { createStore } from 'redux'

// const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}, options) => {
//     return render(<Provider store={store}>{component}</Provider>, options)
// }

// // re-export everything
// export * from '@testing-library/react'
// // override render method
// export { renderWithRedux }