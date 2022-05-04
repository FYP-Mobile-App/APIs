const config = require('../config/db.config');
const { Tokens } = require('../models')(config.DB);

module.exports = {
  tokens: async (req, res) => {
    try {
      const tokens = await Tokens.findAll();
      return res.status(200).json({ tokens: tokens });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
