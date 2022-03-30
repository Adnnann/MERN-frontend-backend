import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    id:{
        type:Number,  
    },
    name:{
        type:String,
        required:'Name is required',
        trim: true,

    },
    username:{
        type:String,
        required:'Username is required',
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
    },
    updated: Date,
    hashed_password:{
        type:String,
        required: 'Password is required'
    },
    salt:String
})

UserSchema.virtual('password')
.set(function(password){
    this._password = password,
    this.salt = this.makeSalt(),
    this.hashed_password = this.encryptPassword(password)

    console.log(this.hashed_password)

})

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
            
        }catch(err){
            return err
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password', 'Password must be at least 6 characters')
    }
}, null)

export default mongoose.model('User', UserSchema)
