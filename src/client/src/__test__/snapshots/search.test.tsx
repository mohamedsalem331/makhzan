import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import SearchComponent from '../../components/Filter/SearchComponent'

test('search componenet snapshot renders correctly', () => {
  const addFilters = jest.fn()

  const tree = renderer
    .create(
      <MemoryRouter>
        <SearchComponent addFilters={addFilters} />
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
