# 🍔 FoodWagen - Food Delivery Platform

A modern, responsive food delivery platform built with Next.js, TypeScript, and Node.js. This project demonstrates a pixel-perfect implementation of a food ordering system with full CRUD operations for meal management.

## 🚀 Live Demo

- **Frontend**: [https://foodwagen.vercel.app/](https://foodwagen.vercel.app/)
- **Backend API**: [https://foodwagen.onrender.com/api](https://foodwagen.onrender.com/api)

## 📸 Preview

![FoodWagen Homepage](https://github.com/user-attachments/assets/preview-image.png)

## 🏗️ Architecture Overview

```
FoodWagen/
├── frontend/                # Next.js frontend application
│   ├── app/                # App router pages
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── public/            # Static assets
│
├── backend/               # Express.js backend API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   └── services/      # Business logic
│   └── ...
│
└── README.md             # This file
```

## ✨ Features

### Frontend Features
- **Responsive Design**: Pixel-perfect implementation that works seamlessly across all devices
- **Modern UI**: Built with shadcn/ui components for a clean, professional look
- **Meal Management**: 
  - Browse featured meals with filtering options
  - Add new meals through an intuitive modal form
  - Edit existing meals with pre-populated data
  - Delete meals with confirmation dialog
- **Search Functionality**: Real-time search for finding meals quickly
- **Delivery/Pickup Toggle**: Switch between delivery and pickup options
- **Interactive Components**: Smooth animations and transitions

### Backend Features
- **RESTful API**: Clean API design following REST principles
- **MongoDB Integration**: Efficient data storage and retrieval
- **Image Upload**: Support for meal and restaurant logo images via Cloudinary
- **Validation**: Comprehensive input validation and error handling
- **CORS Support**: Configured for secure frontend-backend communication
- **Search API**: Powerful search functionality for meal queries

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Validation**: Custom middleware
- **Deployment**: [Render](https://render.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. The API will be available at [http://localhost:5000](http://localhost:5000)

## 📡 API Documentation

### Base URL
- Local: `http://localhost:5000/api`
- Production: `https://foodwagen.onrender.com/api`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/foods` | Get all food items |
| GET | `/foods?name=query` | Search food items |
| POST | `/foods` | Add a new food item |
| PUT | `/foods/:id` | Update a food item |
| DELETE | `/foods/:id` | Delete a food item |
| GET | `/health` | Check API health |

### Request/Response Examples

#### Get All Foods
```bash
GET /api/foods
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "food_name": "Bow Lasagna",
      "food_price": 2.99,
      "food_rating": 4.6,
      "food_image": "https://...",
      "restaurant_name": "Friendly's",
      "restaurant_logo": "https://...",
      "restaurant_status": "Closed"
    }
  ]
}
```

#### Add New Food
```bash
POST /api/foods
Content-Type: application/json

{
  "food_name": "Pizza Margherita",
  "food_price": 12.99,
  "food_rating": 4.8,
  "food_image": "https://...",
  "restaurant_name": "Italian Corner",
  "restaurant_logo": "https://...",
  "restaurant_status": "Open Now"
}
```

## 🎨 Design Implementation

The project follows a pixel-perfect design implementation with:
- **Brand Colors**: Orange (#FF7008) and Yellow (#FFB30E)
- **Responsive Layout**: Mobile-first approach
- **Component-Based Architecture**: Reusable UI components
- **Accessibility**: WCAG compliant components

## 📦 Project Structure

```
foodwagen/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── header.tsx      # Navigation header
│   │   ├── hero-section.tsx # Hero banner
│   │   ├── featured-meals.tsx # Meals grid
│   │   ├── meal-card.tsx   # Individual meal card
│   │   ├── add-meal-modal.tsx # Add meal form
│   │   ├── edit-meal-modal.tsx # Edit meal form
│   │   ├── delete-meal-modal.tsx # Delete confirmation
│   │   └── footer.tsx      # Site footer
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Server entry
│   └── ...
│
└── README.md
```

## 🚀 Deployment

### Frontend (Vercel)
The frontend is automatically deployed to Vercel on push to the main branch. Visit [https://foodwagen.vercel.app/](https://foodwagen.vercel.app/)

### Backend (Render)
The backend API is deployed on Render. The API endpoint is available at [https://foodwagen.onrender.com/api](https://foodwagen.onrender.com/api)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Implementation Notes

This project was developed as part of the [Eskalate Full Stack Assessment](https://docs.google.com/document/d/1RZIWfS2EK6xqEwpuVbRfd-LusX8grVWEnPs8-r4-M7g/edit?tab=t.0#heading=h.z5atubtpfgzc). The implementation approach was:

1. **Phase 1**: Pixel-perfect frontend implementation with responsive design
2. **Phase 2**: Backend API development with MongoDB integration
3. **Phase 3**: Frontend-backend integration with full CRUD operations

## 📄 License

This project is part of the Eskalate assessment and is for demonstration purposes.

## 🙏 Acknowledgments

- Design inspiration from the Eskalate assessment requirements
- Built with modern web technologies
- Deployed on reliable cloud platforms

---

**Live Demo**: [https://foodwagen.vercel.app/](https://foodwagen.vercel.app/) | **API**: [https://foodwagen.onrender.com/api](https://foodwagen.onrender.com/api)
