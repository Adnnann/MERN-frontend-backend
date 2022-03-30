import Publisher from '../models/publishers.model'
import _ from 'lodash'
import errorHandler from '../controllers/helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

const createPublisher = (req, res) => {

    const Publisher = new Publisher(req.body) 
    Publisher.save((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send({message: 'Publisher successfuly created'})
    })
}
const getPublishers = (req, res) => {
    // get id to enable filtering of data
    const userId = jwtDecode(req.cookies.userJwtToken)._id
    //filter data - get Publishers for last three days
    Publisher.find({})
    //sort data in descinding order
    .exec((err, Publishers) => {
        if(err){
            return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
        res.send(Publishers)
    })
}

const getPublisher =  (req, res) => {
    res.status(200).json(req.profile)
}
const updatePublisher = (req, res, next) => {

    let Publisher = req.profile
    Publisher = _.extend(Publisher, req.body);

    Publisher.updated = Date.now()
    Publisher.save(err=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message: 'Data updated'})
    })
}

const removePublisher = (req, res, next) => {
    let Publisher = req.profile
    Publisher.remove((err)=>{
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        res.send({message:'Publisher deleted'})
    })
}
  

const publisherByID = (req, res, next, id) => {
    Publisher.findById(id).exec((err, Publisher) => {
        if(err || !Publisher){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
    req.profile = Publisher;
    next()
    })
}

export default {
    createPublisher,
    getPublishers,
    updatePublisher,
    removePublisher,
    getPublisher, 
    publisherByID
}
