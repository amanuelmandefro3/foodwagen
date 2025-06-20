# FoodWagen Backend API

A RESTful API for the FoodWagen food delivery application built with Node.js, Express, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your configuration

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `FRONTEND_URL` - Frontend URL for CORS configuration
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Check TypeScript types

## API Endpoints

### Food Endpoints

All food endpoints are prefixed with `/api/foods`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods` | Get all food items |
| GET | `/api/foods?name=[searchTerm]` | Search food items by name |
| POST | `/api/foods` | Add a new food item |
| PUT | `/api/foods/:id` | Update a food item |
| DELETE | `/api/foods/:id` | Delete a food item |

### Food Item Schema

```json
{
  "food_name": "string (required)",
  "food_price": "number (required, positive)",
  "food_rating": "number (0-5)",
  "food_image": "string (valid URL) or file upload",
  "restaurant_name": "string (required)",
  "restaurant_logo": "string (valid URL) or file upload",
  "restaurant_status": "Open Now | Closed (required)"
}
```

### Image Upload Features

- **Supported formats**: JPEG, PNG, GIF, WebP
- **Max file size**: 5MB per image
- **Automatic optimization**: Images are automatically resized and optimized by Cloudinary
- **Storage**: Images are stored on Cloudinary CDN for fast delivery
- **Endpoints**: Both POST and PUT endpoints support file uploads

### Health Check

- GET `/health` - Check server status

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── validations/    # Request validation schemas
│   └── index.ts        # Server entry point
├── .env.example        # Environment variables example
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md          # Project documentation
```

## Testing with Postman/Insomnia

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Import the following base URL: `http://localhost:5000/api`

3. Example requests:

   **Get all foods:**
   ```
   GET http://localhost:5000/api/foods
   ```

   **Search foods:**
   ```
   GET http://localhost:5000/api/foods?name=burger
   ```

   **Add new food (with image URLs):**
   ```
   POST http://localhost:5000/api/foods
   Content-Type: application/json

   {
     "food_name": "Cheeseburger",
     "food_price": 12.99,
     "food_rating": 4.5,
     "food_image": "https://example.com/burger.jpg",
     "restaurant_name": "Burger Palace",
     "restaurant_logo": "https://example.com/logo.jpg",
     "restaurant_status": "Open Now"
   }
   ```

   **Add new food (with file upload):**
   ```
   POST http://localhost:5000/api/foods
   Content-Type: multipart/form-data

   food_name: Cheeseburger
   food_price: 12.99
   food_rating: 4.5
   food_image: [Select file from computer]
   restaurant_name: Burger Palace
   restaurant_logo: [Select file from computer]
   restaurant_status: Open Now
   ```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": []  // Validation errors if applicable
}
```

## Development Tips

- The server runs on `http://localhost:5000` by default
- MongoDB should be running before starting the server
- Use the `npm run dev` command for development with auto-reload
- Check console logs for database connection status

## License

This project is part of the Eskalate assessment.
