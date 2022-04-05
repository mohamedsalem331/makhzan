import { uploadImages } from '../controllers/uploadController'
import express from 'express'
import upload from '../multer/multer'

const router = express.Router()

router.post('/', upload.array('avatar', 3), uploadImages)

export default router
