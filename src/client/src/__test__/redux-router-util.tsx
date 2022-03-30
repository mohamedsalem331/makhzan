import { configureStore } from '@reduxjs/toolkit'
// test-utils.jsx
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { rootReducer } from '../app/store'

interface RenderWithRouterOptions {
  route: string
  history?: MemoryHistory
  preloadedState?: any
}

const render = (
  ui: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    preloadedState,
  }: RenderWithRouterOptions = {} as RenderWithRouterOptions
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })

  return {
    ...rtlRender(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
    history,
  }
}

export * from '@testing-library/react'
export { render }
