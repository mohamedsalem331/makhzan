import cloudinary from 'cloudinary'
require('dotenv').config()

//process.ev

cloudinary.v2.config({
  cloud_name: 'makhzan',
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.API_SECRET_KEY,
})

export const uploadCloudinary = (
  file_path: string
): Promise<cloudinary.UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file_path, function (error, result) {
      if (error) reject('upload on cloudinary failed')
      resolve(result)
    })
  })
}
