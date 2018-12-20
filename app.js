const Koa = require('koa');
const app = new Koa();
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('koa-session');
const MongooseStore = require('koa-session-mongoose');
const staticDir = require('koa-static');
const router = require('./routes');
const config = require('./config/config.json');

require('./models');

require('./config/config-passport');

app.keys = 'koa:sess'

app
  .use(staticDir('./dist'))
  .use(session({
    store: new MongooseStore({
      collection: 'appSessions',
      connection: connection,
      expires: 60*60*1000,
      name: 'AppSession'
    })
  }, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(passport.initialize())
  .use(passport.session())
  .on('error', err => {
    log.error('server error', err)
  })
  .listen(3000, () => {
    console.log('Сервер запущен на 3000 порту');
  });

