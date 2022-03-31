import moongose from 'mongoose'

const BooksSchema = new moongose.Schema({
    Id:{
       type:Number,
    },
    Title:{
        type: String,
        required:'Title is required'
    },
    Description:{
        type: String,
        required:'Description is required'
    },
    Image:{
        type:String,
    },
    Pages:{
        type:Number,
        required:'Number of pages is required'
    },
    Price:{
        type:String,
        required:'Price is required'
    },
    Publisher:{
        type:String,
        required:'Publisher is required'
    },
    Author:{
        type:String,
        required:'Author is required'
    }  
})

BooksSchema.path("Title").validate(async function (Title) {
    
    const book = await this.constructor.findOne({ Title });    
    
    if (book) {    
        
        if (this.id === book.id) {    
            return true;    
        }    
     
        return false;    
    
    }   

    return true;   

}, `Book with entered title already exists!`);


export default moongose.model('Books', BooksSchema)