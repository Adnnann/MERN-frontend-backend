import express from 'express'
import booksCtrl from '../controllers/books.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/books')
.post(authCtrl.hasAuthorization, booksCtrl.createBook)
.get(booksCtrl.getBooks)

router.route('/api/books/:bookId')
.get(authCtrl.hasAuthorization, booksCtrl.getBook)
.put(authCtrl.hasAuthorization, booksCtrl.updateBook)
.delete(authCtrl.hasAuthorization, booksCtrl.removeBook)

router.param('bookId', booksCtrl.BookByID)

export default router