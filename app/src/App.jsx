import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { lazy, Suspense, useState, useEffect } from 'react';

// Lazy-loaded pages — keep non-page components (Sidebar, FeedbackWidget) as static imports
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Marketing = lazy(() => import('./pages/Marketing'));
const Sales = lazy(() => import('./pages/Sales'));
const Finance = lazy(() => import('./pages/Finance'));
const ApiUsage = lazy(() => import('./pages/ApiUsage'));
const Settings = lazy(() => import('./pages/Settings'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Subscription = lazy(() => import('./pages/Subscription'));
const Customers = lazy(() => import('./pages/Customers'));
const Profile = lazy(() => import('./pages/Profile'));
const BotPersonality = lazy(() => import('./pages/BotPersonality'));
const Automation = lazy(() => import('./pages/Automation'));
const Analytics = lazy(() => import('./pages/Analytics'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const ChatInbox = lazy(() => import('./pages/ChatInbox'));
const Orders = lazy(() => import('./pages/Orders'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Templates = lazy(() => import('./pages/Templates'));

import Sidebar from './components/Sidebar';
import FeedbackWidget from './components/FeedbackWidget';
import QuickActionsFAB from './components/QuickActionsFAB';

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen bg-[#0A0A0F]">
    <div className="text-center">
      <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-zinc-500 text-sm">กำลังโหลด...</p>
    </div>
  </div>
);

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
      <QuickActionsFAB navigate={setActivePage} />
    </div>
  );
}

function App() {
  const renderPage = (activePage) => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard setSidebarOpen={() => {}} />;
      case 'analytics':    return <Analytics setSidebarOpen={() => {}} />;
      case 'marketing':   return <Marketing setSidebarOpen={() => {}} />;
      case 'sales':       return <Sales setSidebarOpen={() => {}} />;
      case 'finance':     return <Finance setSidebarOpen={() => {}} />;
      case 'api':         return <ApiUsage setSidebarOpen={() => {}} />;
      case 'settings':    return <Settings setSidebarOpen={() => {}} />;
      case 'pricing':     return <Pricing setSidebarOpen={() => {}} />;
      case 'subscription': return <Subscription setSidebarOpen={() => {}} />;
      case 'customers':   return <Customers setSidebarOpen={() => {}} />;
      case 'profile':     return <Profile setSidebarOpen={() => {}} />;
      case 'personality': return <BotPersonality setSidebarOpen={() => {}} />;
      case 'automation':  return <Automation setSidebarOpen={() => {}} />;
      case 'knowledge':   return <KnowledgeBase setSidebarOpen={() => {}} />;
      case 'inbox':       return <ChatInbox setSidebarOpen={() => {}} />;
      case 'orders':      return <Orders setSidebarOpen={() => {}} />;
      case 'help':        return <HelpCenter setSidebarOpen={() => {}} />;
      case 'templates':   return <Templates setSidebarOpen={() => {}} />;
      default:            return <Dashboard setSidebarOpen={() => {}} />;
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Onboarding — requires auth, shown before the main app for new users */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    {renderPage}
                  </AdminLayout>
                  {/* FeedbackWidget is always visible when the user is logged in */}
                  <FeedbackWidget />
                </ProtectedRoute>
              }
            />

            {/* Redirect root: new users go to onboarding; returning users go to dashboard */}
            <Route
              path="/"
              element={
                localStorage.getItem('onboardingComplete')
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/onboarding" replace />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
