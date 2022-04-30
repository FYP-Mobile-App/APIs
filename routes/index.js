module.exports = (app) => {
  const auth = require('./auth.routes');
  const user = require('./user.routes');
  const tokens = require('./tokens.routes');
  app.use('/auth', auth);
  app.use('/users', user);
  app.use('/tokens', tokens);
};
