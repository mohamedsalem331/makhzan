import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createMemoryHistory } from 'history'

import { render, fireEvent, screen } from '../redux-util'
import LoginPage from '../../containers/LoginPage'

export const handlers = [
  rest.post('http://localhost:5000/users/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'fddd',
        name: 'John Peter',
        email: 'fdds',
        phoneNumber: '432423',
      }),
      ctx.delay(150)
    )
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('fetches & receives a user after clicking the fetch user button', async () => {
  const history = createMemoryHistory()
  render(<LoginPage />, { route: '/login', history })

  expect(screen.queryByText('Login Successful')).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }))

  await expect(await screen.findByText('Login Successful')).toBeInTheDocument()
})
