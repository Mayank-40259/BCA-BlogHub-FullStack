const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // JSON data incoming request handle karne ke liye

// Routes Mapping
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;

// Database connect karke server start karna
const startServer = async () => {
  // Pehle check karega ki database sahi chal raha hai ya nahi
  await connectDB();

  // sequelize.sync() se models automatic aapke MySQL me tables bana denge agar nahi bani hongi toh
  await sequelize.sync({ force: false }); 
  console.log('✔ Database tables synced successfully!');

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
