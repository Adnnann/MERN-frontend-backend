import moongose from 'mongoose'

const PublishersSchema = new moongose.Schema({
    Id:{
       type:Number
    },
    name:{
        type: String,
        required:'Name of publisher is required',
    },
    address:{
        type: Object,
        required:'Address is required'

    },
    zipCode:{
        type:String,
        required:'Zip code is required',
        
    },
    city:{
        type:String,
        required:'City is required',
        match:[/^[a-zA-Z]+$/, 'Only letters can be used for the city name' ]
    },
    country:{
        type:String,
        required:'Country is required',
        match:[/^[a-zA-Z]+$/, 'Only letters can be used for the country name' ]
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