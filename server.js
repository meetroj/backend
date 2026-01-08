const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors({
  origin: "https://your-frontend-domain.com",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("DB connection failed:", err.message);
});
