import axios from 'axios'

export const fetchImages = async () => {
  return await axios.get(`api/images`)
}

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

test('uploading images to backend then receiving link, mocking axios', async () => {
  mockedAxios.post.mockImplementation(() =>
    Promise.resolve({ data: ['image1', 'image2', 'image3'] })
  )

  mockedAxios.get.mockImplementation(() => Promise.resolve({ data: ['link1', 'link2', 'link3'] }))

  const res: any = await fetchImages()

  expect(axios.get).toHaveBeenCalledWith(`api/images`)
  expect(res.data).toHaveLength(3)
})
