// server/config/db.js
import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI is not defined in process.env. Cannot connect to database.".red.bold);
        process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI); // Will use hardcoded value
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;