import express from 'express'
import booksCtrl from '../controllers/books.controller'

const router = express.Router()

router.route('/api/books')
.post(booksCtrl.createBook)
.get(booksCtrl.getBooks)

router.route('/api/books/:bookId')
.get(booksCtrl.getBook)
.put(booksCtrl.updateBook)
.delete(booksCtrl.removeBook)

router.param('bookId', booksCtrl.BookByID)

export default router