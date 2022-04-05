import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import { uploadCloudinary } from '../config/cloudinary'

interface IFileFilterCallback extends FileFilterCallback {
  (error: Error | null): void
}

const storage = multer.diskStorage({
  destination(req, file, cb: (error: Error | null, destination: string) => void) {
    cb(null, 'src/uploads/images/')
  },
  filename(req, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string | boolean) => void
) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(null, 'Images format not acceptable')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb: IFileFilterCallback) {
    checkFileType(file, cb)
  },
})

const uploadImagesCloud = async (myFiles: any): Promise<string[]> => {
  let myImages: any = []

  // 1- store file in uploades/images through multer
  // 2- loop through each File
  // 3- ensure file path is true
  // 4- we call uploadCloudinary and pass file path to it to be uploaded on cloudinary
  // 5- we call async uploadCloudinary and pass file path and wait to be uploaded on cloudinary
  // 6- we call unlink func sync to ensure we remove the file stored on the file system
  // 7- we add the image url returned from cloudinary func and push it to the images
  // 8- return the images to the controller to resolve the route and return the images arr to client

  myImages = await Promise.all(
    myFiles.map(async (file: any) => {
      try {
        const fileExists = fs.statSync(file.path).isFile()
        if (fileExists) {
          const img = await uploadCloudinary(file.path)
          fs.unlink(file.path, function (err) {
            if (err) return console.log(err)
            console.log('file deleted successfully')
          })
          return img?.secure_url
        }
      } catch (error) {
        console.log('file does not exist')
      }
    })
  )

  return myImages
}

export { uploadImagesCloud }

export default upload
