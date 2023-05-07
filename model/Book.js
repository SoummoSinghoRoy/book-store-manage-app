const BookDB = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allownull: false
    },
    publish: {
      type: DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('dateOfBirth')).format('YYYY-MM-DD')
      },
      allowNull: false
    },
    baseprice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Book
}

module.exports = BookDB;