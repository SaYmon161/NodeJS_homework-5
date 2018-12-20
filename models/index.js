const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://root:qwerty123@ds141024.mlab.com:41024/loftschool-nodejs',
  { useNewUrlParser: true }
);

require('./user');
mongoose.connection.on('connected', () => {
  console.log(
    'Mongoose connection open mongodb://root:qwerty123@ds141024.mlab.com:41024/loftschool-nodejs'
  );
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected app termination');
    process.exit(0);
  });
});