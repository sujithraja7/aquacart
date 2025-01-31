const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const petRoutes = require('./routes/pets');
const authRoutes = require('./routes/auth');
const accessoryRoutes = require('./routes/accessories');
const orderRoutes = require('./routes/orders');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/accessories', accessoryRoutes);
app.use('/api/orders', orderRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        server: 'running',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong! Please try again later.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// MongoDB Connection
const connectDB = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            console.log('Attempting to connect to MongoDB...');
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/petshop', {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            console.log('MongoDB Connected Successfully!');
            return true;
        } catch (err) {
            console.error(`MongoDB connection attempt ${i + 1} failed:`, err.message);
            if (i < retries - 1) {
                console.log(`Retrying in ${delay/1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    return false;
};

// Start server
const startServer = async () => {
    try {
        const connected = await connectDB();
        if (!connected) {
            console.error('Failed to connect to MongoDB after multiple retries. Exiting...');
            process.exit(1);
        }

        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

// Handle process errors
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle MongoDB connection errors
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectDB();
});

startServer();
