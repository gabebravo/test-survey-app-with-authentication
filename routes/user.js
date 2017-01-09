const {BasicStrategy} = require('passport-http');
const express = require('express');
const router  =  new express.Router();
const passport = require('passport');

const db   = require('../lib/db');
const User = db.mongoose.model('User');

function getUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!users) {
      res.sendStatus(404);
    }

    res.json(users);
  });
}

function getUserById(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!user) {
      res.sendStatus(404);
    }

    res.json(user);
  });
}

function createUser(req, res) {
  const user = new User(req.body);

  user.save((err, u) => {
    if (err) {
      res.status(500).send(err)
    }

    res.send(u);
  });
}

function deleteUser(req, res) {
  User.remove({
      _id: req.params.id}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.status(204).end();
  });
}

function updateUser(req, res) {
  User.findById({
    _id: req.params.id}, (err, user) => {
    // an empty find will return everything
    if (err) {
      res.send(err);
    }
    user.name = req.body.name;
    user.password = req.body.password;
    user.save(err => { // save the new info
      if(err){
        res.send(err);
      }
      res.status(204).end();
    });
  });
}

router.get('/',    getUsers);
router.get('/:id', getUserById);
router.post('/',   createUser);
router.post('/login',   loginUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

// {
//     "name": "John Doe",
//     "email": "JD123@gmail.com",
//     "password": "ilovecats",
//     "admin": false
//   }

module.exports = router;
