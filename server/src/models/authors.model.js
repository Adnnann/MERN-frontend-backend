import moongose from 'mongoose'
import validate from 'mongoose-validator'

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Please enter valid email address '
    })
]

const AuthorsSchema = new moongose.Schema({
    Id:{
       type:Number,
    },
    Name:{
        type: String,
        required:'Name is required'
    },
    Image:{
        type: String,
    },
    Biography:{
        type:String,
        required:'Biography is required'
    },
    Birthday:{
        type:String,
        required:'Birthday is required'
    },
    Email:{
        type:String,
        required:'Email is required',
        validate: emailValidator
    }, 
})

AuthorsSchema.path("Name").validate(async function (Name) {
    
    const author = await this.constructor.findOne({ Name });    
    
    if (author) {    
        
        if (this.id === author.id) {    
            return true;    
        }    
     
        return false;    
    
    }   

    return true;   

}, `Author already exists!`);


export default moongose.model('Authors',  AuthorsSchema)