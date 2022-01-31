import express, { Request } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { uploadCloudinary } from '../config/cloudinary'
const router = express.Router()

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
    cb: (error: Error | null, filename: string) => void
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
    cb(undefined, 'Images format is only acceptable')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.array('avatar', 3), async (req: Request, res) => {
  try {
    const files = JSON.parse(JSON.stringify(req.files))

    const myImages = await fetchImages(files)

    res.send({ myImages })
  } catch (e) {
    res.status(404).send({ message: 'error Image upload' })
  }
})

const fetchImages = async (myFiles: any): Promise<string[]> => {
  let myImages: Array<string> = []
  for (let i = 0; i < myFiles.length; i++) {
    fs.stat(myFiles[i].path, (err, stats) => {
      if (err) throw new Error('Image file doesnt exist in the root')

      uploadCloudinary(myFiles[i].path)
        .then((res) => {
          myImages.push(res.secure_url)
          if (stats.isFile()) {
            fs.unlink(myFiles[i].path, function (err) {
              if (err) return console.log(err)
              console.log('file deleted successfully')
            })
          }
        })
        .catch((err) => console.log(err))
    })
  }
  return myImages
}

export default router
