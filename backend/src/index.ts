// Load environment variables FIRST - before any other imports that use them
import * as dotenv from 'dotenv';
dotenv.config();


// Now import other modules
import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import { serverConfig } from './config/server';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import foodRouter from './routes/food.router';
import './config/cloudinary';

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(serverConfig.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API welcome endpoint
app.get(`${serverConfig.apiPrefix}`, (_req, res) => {
  res.json({
    message: 'Welcome to FoodWagen API',
    version: '1.0.0',
    endpoints: {
      foods: {
        'GET /api/foods': 'Get all food items',
        'GET /api/foods?name=[searchTerm]': 'Search food items',
        'GET /api/foods/search?name=[searchTerm]': 'Search food items (alternate)',
        'POST /api/foods': 'Add new food item',
        'PUT /api/foods/:id': 'Update food item',
        'DELETE /api/foods/:id': 'Delete food item'
      },
      health: {
        'GET /health': 'Check server status'
      }
    }
  });
});

// API Routes
app.use(`${serverConfig.apiPrefix}/foods`, foodRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = serverConfig.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
