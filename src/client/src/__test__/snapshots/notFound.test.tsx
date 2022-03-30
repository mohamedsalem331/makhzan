import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import NotFound from '../../components/404/NotFoundRoute'

test('not found component snapshot renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
