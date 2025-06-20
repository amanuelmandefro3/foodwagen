export const serverConfig = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  apiPrefix: '/api',
  cors: {
    origin: [
      'http://localhost:3000',
      'https://foodwagen.vercel.app',
      process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    credentials: true,
  }
}; 