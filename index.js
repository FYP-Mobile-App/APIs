require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

//CORS POLICIE
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to wallet Api page');
});
require('./routes')(app);

// MISSING ROUTES
app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

// SERVER PORT
const PORT = process.env.APP_PORT || 9900;

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
