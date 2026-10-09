import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { dashboardService } from '../../services/api';

interface AdminLayoutProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ theme, toggleTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchUnread = async () => {
    try {
      const stats = await dashboardService.getStats();
      setUnreadCount(stats.unreadMessages);
    } catch {
      // Ignore background error
    }
  };

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // Poll every 30s for new messages
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex min-vh-100 bg-body">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadMessagesCount={unreadCount}
      />
      <div className="flex-grow-1 d-flex flex-column min-vh-100" style={{ minWidth: 0 }}>
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-grow-1 p-3 p-md-4 p-lg-5">
          <Outlet context={{ refreshStats: fetchUnread }} />
        </main>
      </div>
    </div>
  );
};
