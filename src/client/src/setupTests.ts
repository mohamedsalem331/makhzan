import { createMatchMedia } from './__test__/__mocks__/MatchMedia'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { mswServer } from './__test__/test-helpers/msw-server'

beforeAll(() => {
  window.matchMedia = createMatchMedia(window.innerWidth)
  mswServer.listen({
    onUnhandledRequest(req) {
      console.error('Found an unhandled %s request to %s', req.method, req.url.href)
    },
  })
})
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())
