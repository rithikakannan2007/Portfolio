import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Full-Stack Dynamic Portfolio REST API',
    version: '2.0.0',
    description:
      'Complete OpenAPI 3.0 specification for the dynamic portfolio web application and admin management dashboard.',
    contact: {
      name: 'Portfolio Administrator',
      email: 'admin@portfolio.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token obtained from /api/auth/login'
      }
    },
    schemas: {
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'admin@portfolio.com' },
          password: { type: 'string', example: 'admin123' }
        }
      },
      ProjectInput: {
        type: 'object',
        required: ['title', 'description', 'technologies', 'image'],
        properties: {
          title: { type: 'string', example: 'Used Products App' },
          description: { type: 'string', example: 'A web application for buying and selling used products.' },
          technologies: { type: 'array', items: { type: 'string' }, example: ['React', 'TypeScript', 'Node.js', 'MongoDB'] },
          image: { type: 'string', example: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80' },
          githubUrl: { type: 'string', example: 'https://github.com/example/used-products' },
          liveUrl: { type: 'string', example: 'https://marketplace-demo.example.com' },
          category: { type: 'string', example: 'Full-Stack' }
        }
      },
      SkillInput: {
        type: 'object',
        required: ['name', 'category', 'percentage'],
        properties: {
          name: { type: 'string', example: 'React' },
          category: { type: 'string', example: 'Frontend' },
          percentage: { type: 'number', example: 92 },
          icon: { type: 'string', example: 'layers' }
        }
      },
      MessageInput: {
        type: 'object',
        required: ['name', 'email', 'subject', 'message'],
        properties: {
          name: { type: 'string', example: 'Jane Smith' },
          email: { type: 'string', example: 'jane@example.com' },
          phone: { type: 'string', example: '+1 555-0192' },
          subject: { type: 'string', example: 'Full-Stack Project Collaboration' },
          message: { type: 'string', example: 'Hi, I would love to discuss an engineering role with you.' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error description' }
        }
      }
    }
  },
  tags: [
    { name: 'Auth', description: 'Admin authentication & session management' },
    { name: 'Profile', description: 'Dynamic developer profile endpoints' },
    { name: 'About', description: 'Dynamic about section endpoints' },
    { name: 'Skills', description: 'Skills CRUD endpoints' },
    { name: 'Education', description: 'Education history CRUD endpoints' },
    { name: 'Experience', description: 'Work experience CRUD endpoints' },
    { name: 'Projects', description: 'Portfolio projects CRUD endpoints' },
    { name: 'Certifications', description: 'Verified credentials CRUD endpoints' },
    { name: 'Achievements', description: 'Honors and awards CRUD endpoints' },
    { name: 'Services', description: 'Developer services CRUD endpoints' },
    { name: 'Resume', description: 'Resume management endpoints' },
    { name: 'Social Links', description: 'Dynamic social profiles CRUD endpoints' },
    { name: 'Messages', description: 'Contact form messages endpoints' },
    { name: 'Settings', description: 'Global portfolio settings endpoints' },
    { name: 'Dashboard', description: 'Admin overview metrics' }
  ],
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Admin login',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } }
        },
        responses: {
          200: { description: 'Login successful with JWT token' },
          401: { description: 'Invalid credentials' }
        }
      }
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        security: [{ BearerAuth: [] }],
        summary: 'Get current authenticated user info',
        responses: {
          200: { description: 'Authenticated user info' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/api/dashboard/stats': {
      get: {
        tags: ['Dashboard'],
        security: [{ BearerAuth: [] }],
        summary: 'Get admin dashboard metrics & counts',
        responses: { 200: { description: 'Metrics summary' } }
      }
    },
    '/api/profile': {
      get: {
        tags: ['Profile'],
        summary: 'Get portfolio profile',
        responses: { 200: { description: 'Profile retrieved' } }
      },
      put: {
        tags: ['Profile'],
        security: [{ BearerAuth: [] }],
        summary: 'Update portfolio profile',
        responses: { 200: { description: 'Profile updated' } }
      }
    },
    '/api/about': {
      get: {
        tags: ['About'],
        summary: 'Get about section content',
        responses: { 200: { description: 'About details retrieved' } }
      },
      put: {
        tags: ['About'],
        security: [{ BearerAuth: [] }],
        summary: 'Update about section content',
        responses: { 200: { description: 'About section updated' } }
      }
    },
    '/api/skills': {
      get: {
        tags: ['Skills'],
        summary: 'Get all skills',
        responses: { 200: { description: 'Skills list retrieved' } }
      },
      post: {
        tags: ['Skills'],
        security: [{ BearerAuth: [] }],
        summary: 'Add a new skill',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/SkillInput' } } }
        },
        responses: { 201: { description: 'Skill added' } }
      }
    },
    '/api/skills/{id}': {
      put: {
        tags: ['Skills'],
        security: [{ BearerAuth: [] }],
        summary: 'Update skill by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Skill updated' } }
      },
      delete: {
        tags: ['Skills'],
        security: [{ BearerAuth: [] }],
        summary: 'Delete skill by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Skill deleted' } }
      }
    },
    '/api/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Get all projects',
        responses: { 200: { description: 'Projects retrieved' } }
      },
      post: {
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
        summary: 'Add a new project',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProjectInput' } } }
        },
        responses: { 201: { description: 'Project added' } }
      }
    },
    '/api/projects/{id}': {
      get: {
        tags: ['Projects'],
        summary: 'Get project by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Project retrieved' } }
      },
      put: {
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
        summary: 'Update project by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Project updated' } }
      },
      delete: {
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
        summary: 'Delete project by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Project deleted' } }
      }
    },
    '/api/education': {
      get: { tags: ['Education'], summary: 'Get all education records', responses: { 200: { description: 'Success' } } },
      post: { tags: ['Education'], security: [{ BearerAuth: [] }], summary: 'Add education record', responses: { 201: { description: 'Created' } } }
    },
    '/api/education/{id}': {
      put: { tags: ['Education'], security: [{ BearerAuth: [] }], summary: 'Update education record', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } },
      delete: { tags: ['Education'], security: [{ BearerAuth: [] }], summary: 'Delete education record', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/experience': {
      get: { tags: ['Experience'], summary: 'Get all experience records', responses: { 200: { description: 'Success' } } },
      post: { tags: ['Experience'], security: [{ BearerAuth: [] }], summary: 'Add experience record', responses: { 201: { description: 'Created' } } }
    },
    '/api/experience/{id}': {
      put: { tags: ['Experience'], security: [{ BearerAuth: [] }], summary: 'Update experience record', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } },
      delete: { tags: ['Experience'], security: [{ BearerAuth: [] }], summary: 'Delete experience record', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/certifications': {
      get: { tags: ['Certifications'], summary: 'Get certifications', responses: { 200: { description: 'Success' } } },
      post: { tags: ['Certifications'], security: [{ BearerAuth: [] }], summary: 'Add certification', responses: { 201: { description: 'Created' } } }
    },
    '/api/certifications/{id}': {
      put: { tags: ['Certifications'], security: [{ BearerAuth: [] }], summary: 'Update certification', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } },
      delete: { tags: ['Certifications'], security: [{ BearerAuth: [] }], summary: 'Delete certification', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/achievements': {
      get: { tags: ['Achievements'], summary: 'Get achievements', responses: { 200: { description: 'Success' } } },
      post: { tags: ['Achievements'], security: [{ BearerAuth: [] }], summary: 'Add achievement', responses: { 201: { description: 'Created' } } }
    },
    '/api/achievements/{id}': {
      put: { tags: ['Achievements'], security: [{ BearerAuth: [] }], summary: 'Update achievement', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } },
      delete: { tags: ['Achievements'], security: [{ BearerAuth: [] }], summary: 'Delete achievement', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/services': {
      get: { tags: ['Services'], summary: 'Get services offered', responses: { 200: { description: 'Success' } } },
      post: { tags: ['Services'], security: [{ BearerAuth: [] }], summary: 'Add service', responses: { 201: { description: 'Created' } } }
    },
    '/api/services/{id}': {
      put: { tags: ['Services'], security: [{ BearerAuth: [] }], summary: 'Update service', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } },
      delete: { tags: ['Services'], security: [{ BearerAuth: [] }], summary: 'Delete service', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/resume': {
      get: { tags: ['Resume'], summary: 'Get current resume metadata & URL', responses: { 200: { description: 'Success' } } },
      put: { tags: ['Resume'], security: [{ BearerAuth: [] }], summary: 'Update resume metadata', responses: { 200: { description: 'Updated' } } }
    },
    '/api/social-links': {
      get: { tags: ['Social Links'], summary: 'Get social links', responses: { 200: { description: 'Success' } } },
      post: { tags: ['Social Links'], security: [{ BearerAuth: [] }], summary: 'Add social link', responses: { 201: { description: 'Created' } } }
    },
    '/api/social-links/{id}': {
      put: { tags: ['Social Links'], security: [{ BearerAuth: [] }], summary: 'Update social link', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } },
      delete: { tags: ['Social Links'], security: [{ BearerAuth: [] }], summary: 'Delete social link', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/messages': {
      get: { tags: ['Messages'], security: [{ BearerAuth: [] }], summary: 'Get all contact messages', responses: { 200: { description: 'Success' } } },
      post: {
        tags: ['Messages'],
        summary: 'Submit visitor contact message',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageInput' } } } },
        responses: { 201: { description: 'Message sent' } }
      }
    },
    '/api/messages/{id}': {
      delete: { tags: ['Messages'], security: [{ BearerAuth: [] }], summary: 'Delete message', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Deleted' } } }
    },
    '/api/messages/{id}/read': {
      put: { tags: ['Messages'], security: [{ BearerAuth: [] }], summary: 'Mark message as read', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Updated' } } }
    },
    '/api/settings': {
      get: { tags: ['Settings'], summary: 'Get portfolio settings', responses: { 200: { description: 'Success' } } },
      put: { tags: ['Settings'], security: [{ BearerAuth: [] }], summary: 'Update portfolio settings', responses: { 200: { description: 'Updated' } } }
    }
  }
};

export const setupSwagger = (app: Application): void => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'Full-Stack Dynamic Portfolio API Docs'
    })
  );
};
