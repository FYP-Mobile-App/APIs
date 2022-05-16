const bcrypt = require('bcryptjs');
const config = require('../config/db.config');
const { Users, OTP } = require('../models')(config.DB);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendSMS(phone, OTP) {
  const result = await client.messages.create({ body: OTP, from: '+19706987547', to: phone });
  return result;
}

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

  registerOTP: async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (user) return res.status(403).json({ message: 'This phone number is already registered' });
      else {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const record = await OTP.findOne({ where: { phone } });
        if (record) record.update({ OTP: randomNumber });
        else {
          await OTP.create({
            phone: phone,
            OTP: randomNumber,
            validated: false,
          });
        }
        await sendSMS(phone, randomNumber);
        return res.status(202).json();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  registerPhoneAndOTP: async (req, res) => {
    try {
      const { phone, otp } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (user) return res.status(403).json({ message: 'This phone number is already registered' });
      else {
        const user = await OTP.findOne({ where: { phone } });
        if (user.OTP != otp) return res.status(401).json({ message: 'Wrong OTP' });
        user.update({ validated: true });
        return res.status(202).json();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  register: async (req, res) => {
    try {
      const { phone, password, publickey, privatekey } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (user) return res.status(403).json({ message: 'This phone number is already registered' });
      else {
        const user = await OTP.findOne({ where: { phone } });
        if (user.validated == false) return res.status(403).json();
        await Users.create({
          phone,
          password,
          publickey,
          privatekey,
        });
        OTP.destroy({ where: { phone: phone } });
        return res.status(200).json({
          message: 'Account created',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  forgetOTP: async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (!user) return res.status(403).json({ message: 'This phone number is not registered' });
      else {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const record = await OTP.findOne({ where: { phone } });
        if (record) record.update({ OTP: randomNumber });
        else {
          await OTP.create({
            phone: phone,
            OTP: randomNumber,
            validated: false,
          });
        }
        await sendSMS(phone, randomNumber);
        return res.status(202).json();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  forgetPhoneAndOTP: async (req, res) => {
    try {
      const { phone, otp } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (!user) return res.status(403).json({ message: 'This phone number is not registered' });
      else {
        const user = await OTP.findOne({ where: { phone } });
        if (user.OTP != otp) return res.status(401).json({ message: 'Wrong OTP' });
        user.update({ validated: true });
        return res.status(202).json();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  forget: async (req, res) => {
    try {
      const { phone, password } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (!user) return res.status(403).json({ message: 'This phone number is not registered' });
      else {
        const record = await OTP.findOne({ where: { phone } });
        if (record.validated == false) return res.status(403).json();
        user.update({ password: password });
        OTP.destroy({ where: { phone: phone } });
        return res.status(200).json({
          message: 'Password changed',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
