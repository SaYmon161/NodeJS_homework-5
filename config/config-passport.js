const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    done(null, id);
  } else {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    function(username, password, done) {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(
              null,
              false,
              {message: 'Incorrect username.'}
            );
          }
          if (!user.validPassword(password)) {
            return done(
              null,
              false,
              {message: 'Incorrect username.'}
            );
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);