import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import User from '../models/user.model'
import config from '../config/config'
import errorHandler from '../controllers/helpers/dbErrorHandlers'

const signin = (req, res) => {

    console.log(req.body.username, req.body.password)
    User.findOne({'username': req.body.username},(err, user) => {
        if(err || !user){
            return res.send({error: 'User not found'})
        }
        if(!user.authenticate(req.body.password)){
            return res.send({error: 'Username and password do not match'})
        }
        const token = jwt.sign({_id: user._id, name:user.name, role:user.role}, config.secret)
        res.cookie('userJwtToken', token, {expire: new Date()+999, httpOnly:true})
        res.send({
            token,
            user: {
                _id:user._id, 
                name: user.name, 
                username: user.username,
                role: user.role
            }
        })
    })
}

const signout = (req, res) => {
    res.clearCookie('userJwtToken')
    res.send({message:'User signed out'})
}

const requireSignin = expressJwt({
    secret:config.secret,
    algorithms:['HS256'],
    userProperty: 'auth',
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized) return res.status(403).json('User is not authorized!')
    next()
}

export default {signin, signout, hasAuthorization, requireSignin}


