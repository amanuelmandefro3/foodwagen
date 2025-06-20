# FoodWagen Frontend

A modern, responsive food delivery platform frontend built with Next.js 15, TypeScript, and shadcn/ui.

## 🚀 Live Demo

Visit the live application: [https://foodwagen.vercel.app/](https://foodwagen.vercel.app/)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 📦 Installation

1. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
frontend/
├── app/
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Homepage component
│   └── globals.css       # Global styles and CSS variables
│
├── components/
│   ├── header.tsx        # Navigation header with Add Meal button
│   ├── hero-section.tsx  # Hero banner with search functionality
│   ├── featured-meals.tsx # Meals grid container
│   ├── meal-card.tsx     # Individual meal card component
│   ├── footer.tsx        # Site footer with links
│   │
│   ├── add-meal-modal.tsx   # Modal for adding new meals
│   ├── edit-meal-modal.tsx  # Modal for editing existing meals
│   ├── delete-meal-modal.tsx # Confirmation modal for deletion
│   │
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
│
├── public/              # Static assets
│   └── placeholder.svg  # Placeholder images
│
└── tailwind.config.ts   # Tailwind configuration with custom colors
```

## 🎨 Design System

### Brand Colors
- **Primary Orange**: `#FF7008` - Used for buttons, CTAs, and branding
- **Secondary Yellow**: `#FFB30E` - Used for hero background
- **Status Colors**:
  - Open: Green (`#00875A`) with light background (`#E6F7F0`)
  - Closed: Orange (`#FF7008`) with light background (`#FFF0E5`)

### Typography
- **Font**: Inter (Google Fonts)
- **Heading Sizes**: Responsive scaling with Tailwind classes
- **Body Text**: Gray scale for readability

### Components
All components follow a consistent design pattern:
- Rounded corners with consistent radius
- Shadow effects for depth
- Hover states for interactivity
- Responsive padding and margins

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Type checking
pnpm type-check   # Check TypeScript types
```

## 📱 Features

### Core Features
1. **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
2. **Meal Management**: Full CRUD operations through modals
3. **Search Functionality**: Real-time meal search
4. **Delivery/Pickup Toggle**: Switch between service types
5. **Form Validation**: Client-side validation with error messages

### Component Features
- **Header**: Sticky navigation with Add Meal CTA
- **Hero Section**: Eye-catching banner with search functionality
- **Meal Cards**: Interactive cards with edit/delete actions
- **Modals**: Accessible dialogs for meal management
- **Footer**: Comprehensive site links and newsletter signup

## 🔌 API Integration

The frontend connects to the backend API for all data operations:

```typescript
// Example API call
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foods`);
const data = await response.json();
```

### API Endpoints Used
- `GET /foods` - Fetch all meals
- `POST /foods` - Add new meal
- `PUT /foods/:id` - Update meal
- `DELETE /foods/:id` - Delete meal

## 🚀 Deployment

The frontend is automatically deployed to Vercel on push to the main branch.

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://foodwagen.onrender.com/api
```

## 🔍 SEO & Performance

- Server-side rendering for better SEO
- Optimized images with Next.js Image component
- Lazy loading for off-screen content
- Minimal JavaScript bundle size

## 📄 License

This project is part of the Eskalate assessment. 