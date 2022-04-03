import express from 'express'
import publishersCtrl from '../controllers/publishers.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/publishers')
.post(authCtrl.hasAuthorization, publishersCtrl.createPublisher)
.get(publishersCtrl.getPublishers)

router.route('/api/publishers/:publisherId')
.get(publishersCtrl.getPublisher)
.put(authCtrl.hasAuthorization, publishersCtrl.updatePublisher)
.delete(authCtrl.hasAuthorization, publishersCtrl.removePublisher)

router.param('publisherId', publishersCtrl.publisherByID)

export default router