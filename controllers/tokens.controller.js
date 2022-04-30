const config = require('../config/db.config');
const { Tokens } = require('../models')(config.DB);

module.exports = {
  addresses: async (req, res) => {
    try {
      const addresses = await Tokens.findAll();
      return res.status(200).json({ addresses: addresses });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
