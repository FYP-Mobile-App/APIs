const bcrypt = require('bcryptjs');
const moment = require('moment');
const config = require('../config/db.config');
const { Users } = require('../models')(config.DB);

module.exports = {
  login: async (req, res) => {
    try {
      const { phone, password } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (!user) return res.status(422).json({ message: 'The provided credentials are incorrect' });

      if (!bcrypt.compareSync(password, user.password)) return res.status(422).json({ message: 'The provided credentials are incorrect' });

      return res.status(200).json({ user: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  signup: async (req, res) => {
    try {
      const { phone, password, publickey, privatekey } = req.body;

      const user = await Users.findOne({ where: { phone: phone } });
      if (user) {
        return res.status(422).json({ message: 'User already exists' });
      } else {
        await Users.create({
          phone,
          password,
          publickey,
          privatekey,
        });
        return res.status(200).json({
          message: 'Account created',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
