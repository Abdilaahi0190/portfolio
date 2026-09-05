const dns = require('dns');
const mongoose = require('mongoose');

// Some environments fail mongodb+srv SRV lookups on the default DNS resolver.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI missing — API will run with in-memory fallback data.');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('Continuing with in-memory fallback data.');
    return false;
  }
};

module.exports = connectDB;
