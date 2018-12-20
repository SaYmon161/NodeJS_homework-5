const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const uuidv4 = require('uuid/v4');

module.exports.saveNewUser = async ctx => {
  const { username, firstname, middlename, surName, password } = ctx.request.body;
  const newUser = new User();
  newUser.username = username;
  newUser.firstname = firstname;
  newUser.surName = surName;
  newUser.middlename = middlename;
  newUser.setPassword(password);
  newUser
    .save()
    .then(user => {
      ctx.request.logIn(user, err => {
        if (err) ctx.app.emit('error', err, ctx);
      })
    })
    .catch(next);
}