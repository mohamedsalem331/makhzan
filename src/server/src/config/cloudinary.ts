import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'makhzan',
  api_key: '357748952369953',
  api_secret: '1vAO5NL1ZZL_CuvQr58qoK_9zz4',
})

type promiseObjectResolve = {
  secure_url: string
}

export const uploadCloudinary = (file_path: string): Promise<promiseObjectResolve> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file_path, function (error, result) {
      if (error) reject('upload on cloudinary failed')
      resolve(result)
    })
  })
}
