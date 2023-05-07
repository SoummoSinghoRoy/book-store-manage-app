const PublisherDB = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Publisher
}

module.exports = PublisherDB;