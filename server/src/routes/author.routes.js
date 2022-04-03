import express from 'express'
import authorsCtrl from '../controllers/authors.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/authors')
.post(authCtrl.hasAuthorization, authorsCtrl.createAuthor)
.get(authorsCtrl.getAuthors)

router.route('/api/authors/:authorId')
.get(authCtrl.hasAuthorization, authorsCtrl.getAuthor)
.put(authCtrl.hasAuthorization, authorsCtrl.updateAuthor)
.delete(authCtrl.hasAuthorization, authorsCtrl.removeAuthor)

router.param('authorId', authorsCtrl.authorByID)

export default router