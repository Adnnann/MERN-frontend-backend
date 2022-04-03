import Book from '../models/books.model'
import _ from 'lodash'
import dbErrorHandlers from '../controllers/helpers/dbErrorHandlers'
const createBook = (req, res) => {

    const book = new Book(req.body) 
    book.save((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send({message: 'Book successfuly created'})
    })
}
const getBooks = (req, res) => {
    
    Book.find({})
    .exec((err, Books) => {
        if(err){
            return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
        res.send(Books)
    })
}

const getBook =  (req, res) => {
   
    res.status(200).json(req.profile)
}
const updateBook = (req, res, next) => {

    let Book = req.profile
    Book = _.extend(Book, req.body);

    Book.updated = Date.now()
    Book.save(err=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message: 'Data updated'})
    })
}

const removeBook = (req, res, next) => {
    
    let Book = req.profile
    Book.remove((err)=>{
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        res.send({message:'Book deleted'})
    })
}
  

const BookByID = (req, res, next, id) => {
    Book.findById(id).exec((err, Book) => {
        if(err || !Book){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
    req.profile = Book;
    next()
    })
}

export default {
    createBook,
    getBooks,
    updateBook,
    removeBook,
    getBook, 
    BookByID
}
