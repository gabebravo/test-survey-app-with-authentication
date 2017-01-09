require('dotenv').config();

const server = require('./lib/server');
const db     = require('./lib/db');

db.connect((err) => {
  if (err) {
    return console.log('BD is not working...');
  }

  server.start();
});
