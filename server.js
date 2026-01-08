const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./src/config/db');
connectDB();

const cors = require('cors');
app.use(cors());


app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);
