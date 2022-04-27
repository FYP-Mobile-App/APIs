module.exports = (app) => {
  const auth = require('./auth.routes');
  const user = require('./user.routes');
  app.use('/auth', auth);
  app.use('/users', user);
};
