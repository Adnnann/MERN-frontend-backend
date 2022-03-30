import moongose from 'mongoose'

const PublishersSchema = new moongose.Schema({
    Id:{
       type:Number
    },
    name:{
        type: String
    },
    address:{
        type: String
    },
    zipCode:{
        type:String
    },
    city:{
        type:Number
    },
    country:{
        type:String
    }, 
})


export default moongose.model('Publishers', PublishersSchema)