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

  phoneInUsersTable: async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (user) return res.status(200).json({ message: 'This phone number is already registered' });
      return res.status(202).json({ phone: phone });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  phoneInOTPTable: async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await OTP.findOne({ where: { phone } });
      if (user) return res.status(200).json({ OTP: user.OTP });
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      await OTP.create({
        phone,
        randomNumber,
      });
      return res.status(201).json({ OTP: OTP });
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
