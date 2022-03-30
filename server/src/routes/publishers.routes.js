import express from 'express'
import publishersCtrl from '../controllers/publishers.controller'

const router = express.Router()

router.route('/api/publishers')
.post(publishersCtrl.createPublisher)
.get(publishersCtrl.getPublishers)

router.route('/api/publishers/:publisherId')
.get(publishersCtrl.getPublisher)
.put(publishersCtrl.updatePublisher)
.delete(publishersCtrl.removePublisher)

router.param('publisherId', publishersCtrl.publisherByID)

export default router