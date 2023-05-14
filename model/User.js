const { hashSync } = require('bcrypt');

const UserDB = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      },
      set(value) {
        if (value.length >= 5 && value.length <= 10) {
          this.setDataValue('password', hashSync(value, 10))
        } else {
          throw new Error('Password length should be between 5 to 10 characters.');
        }
      },
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return User
}

module.exports = UserDB;