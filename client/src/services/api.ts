import axios, { AxiosError } from 'axios';
import {
  User,
  Profile,
  About,
  Skill,
  Education,
  Experience,
  Project,
  Certification,
  Achievement,
  Service,
  Resume,
  SocialLink,
  ContactMessage,
  PortfolioSettings,
  DashboardStats,
  ApiResponse,
  AuthResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request interceptor: automatically attaches JWT token if logged in
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: normalizes error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      // If unauthorized on an admin call, clear token
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
      }
    }
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred while communicating with the server.';
    return Promise.reject(new Error(message));
  }
);

// 1. Authentication Service
export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('portfolio_token', res.data.token);
      if (res.data.user) {
        localStorage.setItem('portfolio_user', JSON.stringify(res.data.user));
      }
    }
    return res.data;
  },

  async getMe(): Promise<{ success: boolean; user: User }> {
    const res = await apiClient.get<{ success: boolean; user: User }>('/auth/me');
    return res.data;
  },

  logout(): void {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },

  getCurrentUser(): User | null {
    const saved = localStorage.getItem('portfolio_user');
    return saved ? JSON.parse(saved) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('portfolio_token');
  }
};

// 2. Profile Service
export const profileService = {
  async get(): Promise<Profile> {
    const res = await apiClient.get<ApiResponse<Profile>>('/profile');
    return res.data.data;
  },
  async update(data: Partial<Profile>): Promise<Profile> {
    const res = await apiClient.put<ApiResponse<Profile>>('/profile', data);
    return res.data.data;
  }
};

// 3. About Service
export const aboutService = {
  async get(): Promise<About> {
    const res = await apiClient.get<ApiResponse<About>>('/about');
    return res.data.data;
  },
  async update(data: Partial<About>): Promise<About> {
    const res = await apiClient.put<ApiResponse<About>>('/about', data);
    return res.data.data;
  }
};

// 4. Skills Service
export const skillService = {
  async getAll(): Promise<Skill[]> {
    const res = await apiClient.get<ApiResponse<Skill[]>>('/skills');
    return res.data.data;
  },
  async getById(id: string): Promise<Skill> {
    const res = await apiClient.get<ApiResponse<Skill>>(`/skills/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>): Promise<Skill> {
    const res = await apiClient.post<ApiResponse<Skill>>('/skills', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Skill>): Promise<Skill> {
    const res = await apiClient.put<ApiResponse<Skill>>(`/skills/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/skills/${id}`);
  }
};

// 5. Education Service
export const educationService = {
  async getAll(): Promise<Education[]> {
    const res = await apiClient.get<ApiResponse<Education[]>>('/education');
    return res.data.data;
  },
  async getById(id: string): Promise<Education> {
    const res = await apiClient.get<ApiResponse<Education>>(`/education/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Education, '_id' | 'createdAt' | 'updatedAt'>): Promise<Education> {
    const res = await apiClient.post<ApiResponse<Education>>('/education', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Education>): Promise<Education> {
    const res = await apiClient.put<ApiResponse<Education>>(`/education/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/education/${id}`);
  }
};

// 6. Experience Service
export const experienceService = {
  async getAll(): Promise<Experience[]> {
    const res = await apiClient.get<ApiResponse<Experience[]>>('/experience');
    return res.data.data;
  },
  async getById(id: string): Promise<Experience> {
    const res = await apiClient.get<ApiResponse<Experience>>(`/experience/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Experience, '_id' | 'createdAt' | 'updatedAt'>): Promise<Experience> {
    const res = await apiClient.post<ApiResponse<Experience>>('/experience', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Experience>): Promise<Experience> {
    const res = await apiClient.put<ApiResponse<Experience>>(`/experience/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/experience/${id}`);
  }
};

// 7. Projects Service
export const projectService = {
  async getAll(): Promise<Project[]> {
    const res = await apiClient.get<ApiResponse<Project[]>>('/projects');
    return res.data.data;
  },
  async getById(id: string): Promise<Project> {
    const res = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const res = await apiClient.post<ApiResponse<Project>>('/projects', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Project>): Promise<Project> {
    const res = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  }
};

// 8. Certifications Service
export const certificationService = {
  async getAll(): Promise<Certification[]> {
    const res = await apiClient.get<ApiResponse<Certification[]>>('/certifications');
    return res.data.data;
  },
  async getById(id: string): Promise<Certification> {
    const res = await apiClient.get<ApiResponse<Certification>>(`/certifications/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Certification, '_id' | 'createdAt' | 'updatedAt'>): Promise<Certification> {
    const res = await apiClient.post<ApiResponse<Certification>>('/certifications', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Certification>): Promise<Certification> {
    const res = await apiClient.put<ApiResponse<Certification>>(`/certifications/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/certifications/${id}`);
  }
};

// 9. Achievements Service
export const achievementService = {
  async getAll(): Promise<Achievement[]> {
    const res = await apiClient.get<ApiResponse<Achievement[]>>('/achievements');
    return res.data.data;
  },
  async getById(id: string): Promise<Achievement> {
    const res = await apiClient.get<ApiResponse<Achievement>>(`/achievements/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Achievement, '_id' | 'createdAt' | 'updatedAt'>): Promise<Achievement> {
    const res = await apiClient.post<ApiResponse<Achievement>>('/achievements', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Achievement>): Promise<Achievement> {
    const res = await apiClient.put<ApiResponse<Achievement>>(`/achievements/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/achievements/${id}`);
  }
};

// 10. Services Service
export const serviceService = {
  async getAll(): Promise<Service[]> {
    const res = await apiClient.get<ApiResponse<Service[]>>('/services');
    return res.data.data;
  },
  async getById(id: string): Promise<Service> {
    const res = await apiClient.get<ApiResponse<Service>>(`/services/${id}`);
    return res.data.data;
  },
  async create(data: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const res = await apiClient.post<ApiResponse<Service>>('/services', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<Service>): Promise<Service> {
    const res = await apiClient.put<ApiResponse<Service>>(`/services/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/services/${id}`);
  }
};

// 11. Resume Service
export const resumeService = {
  async get(): Promise<Resume> {
    const res = await apiClient.get<ApiResponse<Resume>>('/resume');
    return res.data.data;
  },
  async update(data: Partial<Resume>): Promise<Resume> {
    const res = await apiClient.put<ApiResponse<Resume>>('/resume', data);
    return res.data.data;
  }
};

// 12. Social Links Service
export const socialLinkService = {
  async getAll(): Promise<SocialLink[]> {
    const res = await apiClient.get<ApiResponse<SocialLink[]>>('/social-links');
    return res.data.data;
  },
  async create(data: Omit<SocialLink, '_id' | 'createdAt' | 'updatedAt'>): Promise<SocialLink> {
    const res = await apiClient.post<ApiResponse<SocialLink>>('/social-links', data);
    return res.data.data;
  },
  async update(id: string, data: Partial<SocialLink>): Promise<SocialLink> {
    const res = await apiClient.put<ApiResponse<SocialLink>>(`/social-links/${id}`, data);
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/social-links/${id}`);
  }
};

// 13. Messages Service
export const messageService = {
  async send(data: ContactMessage): Promise<{ success: boolean; message: string; data: ContactMessage }> {
    const res = await apiClient.post<ApiResponse<ContactMessage>>('/messages', data);
    return {
      success: res.data.success,
      message: res.data.message || 'Message sent successfully!',
      data: res.data.data
    };
  },
  async getAll(): Promise<ContactMessage[]> {
    const res = await apiClient.get<ApiResponse<ContactMessage[]>>('/messages');
    return res.data.data;
  },
  async markRead(id: string): Promise<ContactMessage> {
    const res = await apiClient.put<ApiResponse<ContactMessage>>(`/messages/${id}/read`, {});
    return res.data.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/messages/${id}`);
  }
};

// 14. Settings Service
export const settingsService = {
  async get(): Promise<PortfolioSettings> {
    const res = await apiClient.get<ApiResponse<PortfolioSettings>>('/settings');
    return res.data.data;
  },
  async update(data: Partial<PortfolioSettings>): Promise<PortfolioSettings> {
    const res = await apiClient.put<ApiResponse<PortfolioSettings>>('/settings', data);
    return res.data.data;
  }
};

// 15. Dashboard Stats Service
export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const res = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return res.data.data;
  }
};

export default apiClient;
