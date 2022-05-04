const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        },
      },
      publickey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privatekey: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: 1,
      timestamps: true,
      name: {
        singular: 'user',
        plural: 'users',
      },
      hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, 10);
          return user;
        },
        beforeUpdate: (user) => {
          if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
          return user;
        },
      },
    },
  );
  return Users;
};
