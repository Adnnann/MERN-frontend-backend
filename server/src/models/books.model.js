import moongose from 'mongoose'

const BooksSchema = new moongose.Schema({
    Id:{
       type:Number
    },
    Title:{
        type: String
    },
    Description:{
        type: String
    },
    Image:{
        type:String
    },
    Pages:{
        type:Number
    },
    Price:{
        type:String
    },
    Publisher:{
        type:String
    },
    Author:{
        type:String
    }  
})


export default moongose.model('Books', BooksSchema)