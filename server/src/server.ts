import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log('==================================================');
      console.log(`🚀 Portfolio Server running at http://localhost:${PORT}`);
      console.log(`📖 Swagger API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`✨ Health Check: http://localhost:${PORT}/api/health`);
      console.log('==================================================');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
