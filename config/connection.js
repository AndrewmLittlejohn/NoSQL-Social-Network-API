//  18-NoSQL/01-Activities/13-Ins_CRUD-Mongoose/config/connection.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialNetwork' , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;