import express, { Request } from 'express'
import upload, { uploadImagesCloud } from '../multer/multer'

const router = express.Router()

router.post('/', upload.array('avatar', 3), async (req: Request, res) => {
  try {
    const files = JSON.parse(JSON.stringify(req.files))
    const myImages = await uploadImagesCloud(files)

    res.send({ myImages })
  } catch (e) {
    res.status(404).send({ message: 'error Image upload' })
  }
})

export default router
