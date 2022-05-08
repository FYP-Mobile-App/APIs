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

  phone: async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await Users.findOne({ where: { phone } });
      if (user) return res.status(403).json({ message: 'This phone number is already registered' });
      else {
        const user = await OTP.findOne({ where: { phone } });
        if (user) {
          await sendSMS(phone, user.OTP);
        } else {
          const randomNumber = Math.floor(1000 + Math.random() * 9000);
          await OTP.create({
            phone: phone,
            OTP: randomNumber,
          });
          await sendSMS(phone, randomNumber);
        }
        return res.status(202).json();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  phoneAndOTP: async (req, res) => {
    try {
      const { phone, otp } = req.body;
      const user = await OTP.findOne({ where: { phone } });
      if (user.OTP == otp) return res.status(200).json();
      return res.status(401).json({ message: 'Wrong OTP' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },

  signup: async (req, res) => {
    try {
      const { phone, password, publickey, privatekey } = req.body;
      await Users.create({
        phone,
        password,
        publickey,
        privatekey,
      });
      return res.status(200).json({
        message: 'Account created',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
