const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  name: {
    type    : String,
    required: true,
    unique: false
  },

  description: {
    type    : String,
    required: true,
    unique: false
  },

  users: [
    { id: String }
  ],

  count: {
    yes: Number,
    no: Number
  },

  expiration: {
    type: Date,
    required: true,
    unique: false
  }

});

module.exports = eventSchema;

// db.events.insert({ "name": "Cats or Dogs", "topic": "Do you like Cats better than Dogs", "users": [{"id":"5869f89eaa07c6756ab2d23f"}],"count": {"yes": 1, "no": 0}, "expiration": 1352540684243})
