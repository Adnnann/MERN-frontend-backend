import moongose from 'mongoose'

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
        type:Date,
        required:'Birthday is required'
    },
    Email:{
        type:String,
        required:'Email is required'
    }, 
})

AuthorsSchema.path("Name").validate(async function (Name) {
    
    const author = await this.constructor.findOne({ Name });    
    
    if (author) {    
        
        if (this.id === book.id) {    
            return true;    
        }    
     
        return false;    
    
    }   

    return true;   

}, `Author already exists!`);


export default moongose.model('Authors',  AuthorsSchema)