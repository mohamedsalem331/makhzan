import { BasedApiUrl } from '../api/BaseUrl'
import axios from 'axios'

export const uploadImages = async (files: string[]) => {
  try {
    const formData = new FormData()
    files.forEach((file: string) => formData.append('avatar', file))
    const response = await axios({
      method: 'post',
      url: `${BasedApiUrl}/uploads`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    return response.data.myImages
  } catch (error) {
    return 'Err happened while uploading images'
  }
}
