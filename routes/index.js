const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const controllers = require('../controllers');

// router.all('*', controllers.token);

router.get('*', async ctx => {
  ctx.body = fs.readFileSync(
    path.resolve(path.join('dist', 'index.html')),
    'utf8'
  );
})

router.post('/api/saveNewUser', koaBody(), controllers.saveNewUser)

module.exports = router;