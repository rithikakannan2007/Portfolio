import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { SkillsPage } from './pages/public/SkillsPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { EducationPage } from './pages/public/EducationPage';
import { ExperiencePage } from './pages/public/ExperiencePage';
import { CertificationsPage } from './pages/public/CertificationsPage';
import { AchievementsPage } from './pages/public/AchievementsPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ResumePage } from './pages/public/ResumePage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProfile } from './pages/admin/AdminProfile';
import { AdminAbout } from './pages/admin/AdminAbout';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminExperience } from './pages/admin/AdminExperience';
import { AdminEducation } from './pages/admin/AdminEducation';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminCertifications } from './pages/admin/AdminCertifications';
import { AdminAchievements } from './pages/admin/AdminAchievements';
import { AdminResume } from './pages/admin/AdminResume';
import { AdminSocialLinks } from './pages/admin/AdminSocialLinks';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout theme={theme} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="education" element={<AdminEducation />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="certifications" element={<AdminCertifications />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="resume" element={<AdminResume />} />
            <Route path="social-links" element={<AdminSocialLinks />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public Portfolio Routes */}
          <Route
            path="*"
            element={
              <div className="d-flex flex-column min-vh-100">
                <PublicNavbar theme={theme} toggleTheme={toggleTheme} brandName="Alex Morgan" />
                <main className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/experience" element={<ExperiencePage />} />
                    <Route path="/education" element={<EducationPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/certifications" element={<CertificationsPage />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <PublicFooter />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
