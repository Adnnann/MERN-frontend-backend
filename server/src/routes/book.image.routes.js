import multer from 'multer'
import express from 'express'
import imageCtrl from '../controllers/book.image.controller'

const storageBookImage = multer.diskStorage({
    destination: (req, file, callback) => {
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
.post(uploadBookImage.single('test'), imageCtrl.create)
.delete(imageCtrl.removeFiles)

export default router;