import express, { Router } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import userRouter from './routes/userRouter'
import uploadRouter from './multer/multer'
import cloudinary from 'cloudinary'

export default function initializeServer(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors(origin))
  app.use(compression())

  app.use(express.static(__dirname + '/uploads'))

  // express routers
  app.use('/users', userRouter)
  app.use('/uploads', uploadRouter)
  // app.use(taskRouter)

  // fs.stat(__dirname + '/uploads/images/avatar-1643654468394.jpg', (err, stats) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   fs.unlink(__dirname + '/uploads/images/avatar-1643654468394.jpg', function (err) {
  //     if (err) return console.log(err)
  //     console.log('file deleted successfully')
  //   })
  // })

  // cloudinary.v2.config({
  //   cloud_name: 'makhzan',
  //   api_key: '357748952369953',
  //   api_secret: '1vAO5NL1ZZL_CuvQr58qoK_9zz4',
  // })

  // cloudinary.v2.uploader.upload(
  //   'src//uploads//images//avatar-1643654468392.jpg',
  //   function (error, result) {
  //     if (error) console.log(error)

  //     console.log(result)
  //   }
  // )

  return app
}
