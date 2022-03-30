import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import CustomizedSnackBar from '../../components/SnackBarComponent'

test('snackbar renders correctly ', () => {
  const tree = renderer
    .create(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <CustomizedSnackBar AlertOn={true} Message="Rendered Successfully" />
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
