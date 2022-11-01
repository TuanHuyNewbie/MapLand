require('dotenv').config();
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
  address: {type: String},
});

module.exports = mongoose.model('user', user); 