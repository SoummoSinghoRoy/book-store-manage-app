const config = require('config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.get('db'), config.get('db_user'), config.get('db_password'), {
  host: config.get('db_host'),
  port: config.get('db_port'),
  dialect: config.get('dialect')
})

sequelize.authenticate()
          .then(() => {
            console.log('Database connected succesfully');
          })
          .catch(err => {
            console.log(`Database not connected - ${err}`);
          })

let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./User')(sequelize, DataTypes);
db.publisher = require('./Publisher')(sequelize, DataTypes);
db.book = require('./Book')(sequelize, DataTypes);

db.publisher.hasMany(db.book, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'publisherId'
})
db.book.belongsTo(db.publisher, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE', 
})

module.exports = db;