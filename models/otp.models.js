module.exports = (sequelize, DataTypes) => {
  const OTP = sequelize.define('OTP', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    OTP: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return OTP;
};
