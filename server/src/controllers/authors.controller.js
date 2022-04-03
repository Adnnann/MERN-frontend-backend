import Author from '../models/Authors.model'
import _ from 'lodash'
import dbErrorHandlers from '../controllers/helpers/dbErrorHandlers'

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

    Author.find({})
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

   
    let Author = req.profile
    Author = _.extend(Author, req.body);

    Author.updated = Date.now()
    Author.save(err=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message: 'Data updated'})
    })
}

const removeAuthor = (req, res, next) => {
    
    let Author = req.profile
    Author.remove((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message:'Author deleted'})
    })
}
  

const authorByID = (req, res, next, id) => {

    Author.findById(id).exec((err, Author) => {

        if(err || !Author){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
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
