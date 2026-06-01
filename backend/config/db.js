import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected successfully: ${conn.connection.host} ⚡`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message} ❌`);
    console.log('The backend server will remain online. The React frontend will automatically and transparently fall back to localStorage mode. ⚡');
  }
};

export default connectDB;
