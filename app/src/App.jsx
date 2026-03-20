import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketing from './pages/Marketing';
import Sales from './pages/Sales';
import Finance from './pages/Finance';
import ApiUsage from './pages/ApiUsage';
import Settings from './pages/Settings';

// New Pages
import Pricing from './pages/Pricing';
import Subscription from './pages/Subscription';
import Customers from './pages/Customers';
import Profile from './pages/Profile';

import Sidebar from './components/Sidebar';
import { useState, useEffect } from 'react';

function AdminLayout({ children }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activePage]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0F]">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden">
        {children(activePage, setSidebarOpen)}
      </main>
    </div>
  );
}

function App() {
  const renderPage = (activePage, setSidebarOpen) => {
    const props = { setSidebarOpen };
    switch (activePage) {
      case 'dashboard':    return <Dashboard {...props} />;
      case 'marketing':   return <Marketing {...props} />;
      case 'sales':       return <Sales {...props} />;
      case 'finance':     return <Finance {...props} />;
      case 'api':         return <ApiUsage {...props} />;
      case 'settings':    return <Settings {...props} />;
      case 'pricing':     return <Pricing {...props} />;
      case 'subscription': return <Subscription {...props} />;
      case 'customers':   return <Customers {...props} />;
      case 'profile':     return <Profile {...props} />;
      default:            return <Dashboard {...props} />;
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  {renderPage}
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
