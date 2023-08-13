import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

async function connectDB() {
  const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ravens';

  await mongoose.connect(mongo_uri)
    .then(() => {
      console.log('Connected to MONGODB')
    })
    .catch((error) => {
    console.log(error.message);
  });
}

export default connectDB;
