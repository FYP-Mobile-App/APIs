const config = require('../config/db.config');
const { Users } = require('../models')(config.DB);

module.exports = {
  address: async (req, res) => {
    try {
      const { phone } = req.query;
      const user = await Users.findOne({ where: { phone } });
      if (!user) return res.status(422).json({ message: 'The provided number does not exist' });

      return res.status(200).json({ address: user.publickey });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
