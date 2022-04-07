module.exports = (app) => {

  const auth = require('./auth.routes');
  app.use('/auth', auth);

};
