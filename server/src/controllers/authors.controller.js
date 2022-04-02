import Author from '../models/Authors.model'
import _ from 'lodash'
import dbErrorHandlers from '../controllers/helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

const createAuthor = (req, res) => {

    const author = new Author(req.body) 
    author.save((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send({message: 'Author successfuly created'})
    })
}
const getAuthors = (req, res) => {
    // get id to enable filtering of data
    const userId = jwtDecode(req.cookies.userJwtToken)._id
    //filter data - get Authors for last three days
    Author.find({})
    .where('userId').equals(userId)
    //sort data in descinding order
    .sort({"created":-1})
    .exec((err, Authors) => {
        if(err){
            return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
        res.send(Authors)
    })
}

const getAuthor =  (req, res) => {
    res.status(200).json(req.profile)
}
const updateAuthor = (req, res, next) => {

    console.log(req)
    let Author = req.profile
    console.log(Author)
    Author = _.extend(Author, req.body);

    Author.updated = Date.now()
    Author.save(err=>{
        if(err){
            console.log(err)
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message: 'Data updated'})
    })
}

const removeAuthor = (req, res, next) => {
    let Author = req.profile
    Author.remove((err)=>{
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        res.send({message:'Author deleted'})
    })
}
  

const authorByID = (req, res, next, id) => {

    Author.findById(id).exec((err, Author) => {
        console.log(Author)
        if(err || !Author){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }

    req.profile = Author;
    next()
    })
}

export default {
    createAuthor,
    getAuthors,
    updateAuthor,
    removeAuthor,
    getAuthor, 
    authorByID
}
