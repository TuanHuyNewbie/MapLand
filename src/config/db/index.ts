
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
//const mongoose = require("mongoose");
//import { connect } from 'mongoose'
let URL1 = process.env.MONGODB_URI
const connectDB = async () => {
  try {
      await mongoose.connect(`${URL1}`/*, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }*/);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
