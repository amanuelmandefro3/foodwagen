export const serverConfig = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  apiPrefix: '/api',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }
}; 