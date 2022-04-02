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

PublishersSchema.path("name").validate(async function (name) {
    
    const publisher = await this.constructor.findOne({ name });    
    
    if (publisher) {    
        
        if (this.id === publisher.id) {    
            return true;    
        }    
     
        return false;    
    
    }   

    return true;   

}, `Publisher already exists!`);


export default moongose.model('Publishers', PublishersSchema)