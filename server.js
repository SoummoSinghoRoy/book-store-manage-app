require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./model/db_config');

const PORT = process.env.PORT || 9920

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running successfully on port: ${PORT}`);
  })
}).catch((err) => {
  console.log(`DB connection failed. error: ${err}`);
})
