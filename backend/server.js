const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const data = require('./routes/Data/data');
require('dotenv').config();
const workspaceRoutes = require('./routes/workspaceRoutes');

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());



// Use the imported route
app.use('/auth', authRoutes);
app.use('/data',data);
// app.use('.workspaces')
app.use('/api', workspaceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
