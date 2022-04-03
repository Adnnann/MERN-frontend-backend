import multer from 'multer'
import express from 'express'
import imageCtrl from '../controllers/book.image.controller'
import authCtrl from '../controllers/auth.controller'
import fs from 'file-system'

const storageBookImage = multer.diskStorage({
    destination: (req, file, callback) => {

        if(!fs.fs.existsSync('./images/')){
            fs.fs.mkdirSync('./images/', { recursive: true })
        }

        callback(null, './images/')
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname}`)
    }, 
})


const uploadBookImage = multer({
    storage:storageBookImage,
   
})


const router = express.Router()

router.route('/uploadImage')
.post(authCtrl.hasAuthorization, uploadBookImage.single('test'), imageCtrl.create)
.delete(authCtrl.hasAuthorization, imageCtrl.removeFiles)

export default router;