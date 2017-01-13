const mongoose = require('mongoose');
const config   = require('../config');

const userSchema = require('../schemas/user');
const eventSchema = require('../schemas/event');
// const accountSchema = require('../schemas/account');

mongoose.Promise = global.Promise;

class DB {
  constructor() {
    this.mongoose = mongoose;
    this._setupSchemas();
  }

  connect(done) {
    this.mongoose.connect(config.mongo, (err) => {
      if (err) { return done(err); }
      console.log('Connected db...');
      done(null);
    });
  }

  disconnect(done) {
    this.mongoose.disconnect((err) => {
      if (err) { return done(err); }
      console.log('Disconnected db...');
      done(null);
    });
  }

  _setupSchemas() {
    this.mongoose.model('User', userSchema);
    this.mongoose.model('Event', eventSchema);
    // this.mongoose.model('Account', accountSchema);
  }
}

module.exports = new DB();
