import { Request, Response } from 'express'
import { uploadImagesCloud } from '../multer/multer'


// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized

// @desc    fetch all users
// @route   GET /users
// @access  Private/Admin
const uploadImages = async (req: Request, res: Response) => {
    try {
        const files = JSON.parse(JSON.stringify(req.files))
        const myImages = await uploadImagesCloud(files)

        res.send({ myImages })
    } catch (e) {
        res.status(404).send({ message: 'error Image upload' })
    }
}

export { uploadImages }
