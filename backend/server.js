const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const data = require('./routes/Data/data');
require('dotenv').config();
const workspaceRoutes = require('./routes/workspaceRoutes');
const taskRoutes = require("./routes/tasks");
const http = require('http');
const socketIo = require('socket.io');

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Use the imported route
app.use('/auth', authRoutes);
app.use('/data', data);
app.use('/api', workspaceRoutes);
app.use('/api/tasks', taskRoutes);

// Create the HTTP server and socket.io instance
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinWorkspace', (workspaceId) => {
        socket.join(workspaceId);
    });

    socket.on('sendMessage', (workspaceId, message) => {
        io.to(workspaceId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Use server.listen instead of app.listen
