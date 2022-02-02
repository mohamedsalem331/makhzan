import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import { uploadCloudinary } from '../config/cloudinary'

interface IFileFilterCallback extends FileFilterCallback {
  (error: Error | null): void
}

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, 'src/uploads/images/')
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
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
    cb(null, 'Images format is only acceptable')
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

  myImages = await Promise.all(
    myFiles.map(async (file: any) => {
      try {
        const fileExists = fs.statSync('src//uploads//images//avatar-1643744186674.jpg').isFile()
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
