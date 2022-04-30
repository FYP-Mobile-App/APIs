module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return Tokens;
};
