const express = require('express');
const cors = require('cors');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config');

const rootRouter = require('../routes/root');
const userRouter = require('../routes/user');
const eventRouter = require('../routes/event');

const passport = require('./passport');

class Server {
  constructor() {
    this.app  = express();
    this.port = config.port;
    this.config = config;

    this._setupMiddlewares();
    this._setupRoutes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Listening at port ${this.port}`);
    });
  }

  _setupRoutes() {
    this.app.use('/', rootRouter);
    this.app.use('/user', userRouter);
    this.app.use('/event', eventRouter);
  }

  _setupMiddlewares() {
    this.app.use(
      morgan(config.morgan, {})
    );
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(passport.initialize());
  }
}

module.exports = new Server();
