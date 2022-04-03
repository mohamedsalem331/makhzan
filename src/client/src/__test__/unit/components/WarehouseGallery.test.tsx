import WarehouseGallery from '../../../components/WarehouseDetails/WarehouseGallery'
import { createMatchMedia } from '../../../__mocks__/MatchMedia'
import { render, screen, fireEvent } from '../../TestHelpers/redux-router-util'
import { users, warehouses } from '../../TestHelpers/fixtures'

const warehouse = warehouses[0]

describe('WarehouseGallery Component', () => {
  beforeAll(() => {
    // for overriding the setuptests default and rendering side menu instead of navlinks
    window.matchMedia = createMatchMedia(300)
  })
  test('should render WarehouseGallery component with props', async () => {
    render(<WarehouseGallery Images={warehouse.images} />)

    expect(await screen.findAllByRole('img')).toBeTruthy()
    // expect(await screen.findAllByTestId('Image-Item-Gallery')).toHaveLength(warehouse.images.length)
  })
})
