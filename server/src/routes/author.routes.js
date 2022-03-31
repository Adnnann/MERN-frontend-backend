import express from 'express'
import authorsCtrl from '../controllers/authors.controller'

const router = express.Router()

router.route('/api/authors')
.post(authorsCtrl.createAuthor)
.get(authorsCtrl.getAuthors)

router.route('/api/authors/:authorId')
.get(authorsCtrl.getAuthor)
.put(authorsCtrl.updateAuthor)
.delete(authorsCtrl.removeAuthor)

router.param('authorId', authorsCtrl.authorByID)

export default router