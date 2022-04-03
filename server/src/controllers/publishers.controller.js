import Publisher from '../models/publishers.model'
import _ from 'lodash'
import dbErrorHandlers from '../controllers/helpers/dbErrorHandlers'
const createPublisher = (req, res) => {

    const publisher = new Publisher(req.body) 
    
    publisher.address = {
        road:req.body.address
    }
    publisher.save((err)=>{
    
        if(err){
        
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send({message: 'Publisher successfuly created'})
    })
}
const getPublishers = (req, res) => {
    
    Publisher.find({})
    .exec((err, Publishers) => {
        if(err){
            return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send(Publishers)
    })
}

const getPublisher =  (req, res) => {
    res.status(200).json(req.profile)
}
const updatePublisher = (req, res, next) => {
    
    let Publisher = req.profile
    Publisher = _.extend(Publisher, req.body);

    Publisher.address = {
        road:req.body.address
    }

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
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message:'Publisher deleted'})
    })
}
  

const publisherByID = (req, res, next, id) => {
    Publisher.findById(id).exec((err, Publisher) => {
        if(err || !Publisher){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
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
