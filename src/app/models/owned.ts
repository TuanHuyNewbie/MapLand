require('dotenv').config();
import mongoose = require('mongoose');

const Schema = mongoose.Schema;

const owned = new Schema({
  user_id: {type: String},
  land_id: {type: String},
});

module.exports = mongoose.model('owned', owned); 