const express = require('express');
const router  =  new express.Router();

const db   = require('../lib/db');
const Event = db.mongoose.model('Event');

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function getEvents(req, res) {

  Event.find( ( err, events ) => {
    if( err ) {
      res.status(500).send(err);
    }
    if( !events ) {
      res.status(400).send(err);
    }

    res.json(events);
  });
}

function getEventById(req, res) {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!event) {
      res.sendStatus(404);
    }
    res.json(event);
  });
}

function createEvent(req, res) {
  const event = new Event();

  event.name = req.body.name;
  event.topic = req.body.topic;
  event.users = []
  event.count = {
    "yes": 0,
    "no": 0
  }
  event.expiration = new Date();

  event.save((err, e) => {
    if (err) {
      res.status(500).send(err)
    }

    res.send(e);
  });
}

function deleteEvent( req, res ) {
  Event.remove({
    _id: req.params.id }, ( err, event ) => {
    if(err){
      res.send(err);
    }
    res.status(204).end();
  });
}

function updateEvent( req, res ) {
  Event.findById({
    _id: req.params.id }, ( err, event ) => {
    if(err){
      res.send(err);
    }
    event.name = req.body.name;
    event.topic = req.body.topic;
    event.expiration = req.body.expiration;
    event.save(err => { // save the new info
      if(err){
        res.send(err);
      }
      res.status(204).end();
    });
  });
}

router.get('/',    getEvents);
router.get('/:id', getEventById);
router.post('/',   createEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

// db.events.insert({ "name": "Cats or Dogs", "description": "Do you like Cats better than Dogs", "users": [{"id":"5869f89eaa07c6756ab2d23f"}],"count": {"yes": 1, "no": 0}, "expiration": 1352540684243})

module.exports = router;
