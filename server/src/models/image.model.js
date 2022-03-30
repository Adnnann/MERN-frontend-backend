import mongoose from 'mongoose'
import crypto from 'crypto'


const ImageSchema = new mongoose.Schema({
    image:{
        type: String
    },
    imageUrl:{
        type:String
    }, 
    bookTitle:{
        
    }
})

export default mongoose.model('Image', ImageSchema);