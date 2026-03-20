import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
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
        {children(activePage)}
      </main>
    </div>
  );
}

function App() {
  const renderPage = (activePage) => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard setSidebarOpen={() => {}} />;
      case 'marketing':   return <Marketing setSidebarOpen={() => {}} />;
      case 'sales':       return <Sales setSidebarOpen={() => {}} />;
      case 'finance':     return <Finance setSidebarOpen={() => {}} />;
      case 'api':         return <ApiUsage setSidebarOpen={() => {}} />;
      case 'settings':    return <Settings setSidebarOpen={() => {}} />;
      case 'pricing':     return <Pricing setSidebarOpen={() => {}} />;
      case 'subscription': return <Subscription setSidebarOpen={() => {}} />;
      case 'customers':   return <Customers setSidebarOpen={() => {}} />;
      case 'profile':     return <Profile setSidebarOpen={() => {}} />;
      default:            return <Dashboard setSidebarOpen={() => {}} />;
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
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
