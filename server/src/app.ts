import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import aboutRoutes from './routes/aboutRoutes';
import skillRoutes from './routes/skillRoutes';
import educationRoutes from './routes/educationRoutes';
import experienceRoutes from './routes/experienceRoutes';
import projectRoutes from './routes/projectRoutes';
import certificationRoutes from './routes/certificationRoutes';
import achievementRoutes from './routes/achievementRoutes';
import serviceRoutes from './routes/serviceRoutes';
import resumeRoutes from './routes/resumeRoutes';
import socialLinkRoutes from './routes/socialLinkRoutes';
import messageRoutes from './routes/messageRoutes';
import settingsRoutes from './routes/settingsRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows Swagger UI to load its assets inline
    crossOriginEmbedderPolicy: false
  })
);

// CORS Configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin || origin === 'http://localhost:5173') {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger API Documentation
setupSwagger(app);

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/social-links', socialLinkRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Fallback 404 for undefined routes
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.method} ${req.originalUrl}' not found.`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
