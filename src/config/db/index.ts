
require("dotenv").config();

const mongoose = require("mongoose");
let URL1 = process.env['MONGODB_URI']
//URL = "mongodb+srv://tuanhuy:tuanhuy123@cluster0.s39zawz.mongodb.net/Test?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
      await mongoose.connect(URL1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
