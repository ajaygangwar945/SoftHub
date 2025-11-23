const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/softhub';

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', MONGODB_URI);
console.log('');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ SUCCESS: Connected to MongoDB!');
  console.log('Database name: softhub');
  console.log('Host: localhost');
  console.log('Port: 27017');
  console.log('');
  console.log('You can now start your server with: npm start');
  mongoose.connection.close();
  process.exit(0);
})
.catch((error) => {
  console.error('❌ ERROR: MongoDB connection failed!');
  console.error('Error details:', error.message);
  console.log('');
  console.log('Troubleshooting tips:');
  console.log('1. Make sure MongoDB service is running');
  console.log('   - Check Windows Services (services.msc)');
  console.log('   - Look for "MongoDB" service and start it');
  console.log('');
  console.log('2. Check if MongoDB is installed correctly');
  console.log('   - Run: mongod --version');
  console.log('');
  console.log('3. Verify the connection string in .env file');
  console.log('   - Should be: mongodb://localhost:27017/softhub');
  console.log('');
  console.log('4. Try starting MongoDB manually:');
  console.log('   - Open Command Prompt as Administrator');
  console.log('   - Run: net start MongoDB');
  process.exit(1);
});

