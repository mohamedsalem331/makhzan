import { configureStore } from '@reduxjs/toolkit'
// test-utils.jsx
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { rootReducer } from '../app/store'

// const render = (
//   component: React.ReactElement,
//   { initialState = {}, store = configureStore({ reducer: rootReducer }), ...renderOptions } = {}
// ) => {
//   return rtlRender(<Provider store={store}>{component}</Provider>)
// }

interface RenderWithRouterOptions {
  route: string
  history: MemoryHistory
}

const render = (
  ui: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderWithRouterOptions = {} as RenderWithRouterOptions
) => {
  const store = configureStore({
    reducer: rootReducer,
  })

  return {
    ...rtlRender(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    ),
    history,
  }
}

export * from '@testing-library/react'
export { render }
