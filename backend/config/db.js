const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try{
    await mongoose.connect(URI);

    console.log('MongoDB Connected');
  }catch(err){
    console.log("MongoDB Connection Failed");
    console.error(err);
  }
};

module.exports = connectDB;