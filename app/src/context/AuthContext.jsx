import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'https://api.meowchat.store';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('meowchat_user');
    const token = localStorage.getItem('meowchat_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }

    if (data.user.role !== 'admin') {
      throw new Error('บัญชีนี้ไม่มีสิทธิ์เข้าใช้งาน Admin Dashboard');
    }

    localStorage.setItem('meowchat_token', data.token);
    localStorage.setItem('meowchat_user', JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
    return { success: true, user: data.user };
  };

  const register = async (email, password, businessName) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password, businessName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'สมัครไม่สำเร็จ กรุณาลองใหม่');
    }

    // TODO: connect Resend API key via VITE_RESEND_API_KEY
    // Send welcome email via Resend (free tier - 3000 emails/month)
    // Note: This requires VITE_RESEND_API_KEY env var
    // For now just log - will be connected when key is available
    console.log('[MeowChat] New user registered:', email, '- welcome email pending Resend API key');

    // If API returns token + user, auto-login
    if (data.token && data.user) {
      localStorage.setItem('meowchat_token', data.token);
      localStorage.setItem('meowchat_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
    }

    return { success: true, token: data.token || null, user: data.user || null };
  };

  const logout = () => {
    localStorage.removeItem('meowchat_token');
    localStorage.removeItem('meowchat_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasRole = (role) => user?.role === role;
  const isAdmin = () => hasRole(ROLES.ADMIN);
  const isManager = () => hasRole(ROLES.MANAGER) || hasRole(ROLES.ADMIN);

  const updateSubscription = async (plan) => {
    const updatedUser = { ...user, subscription: { plan, status: 'active' } };
    localStorage.setItem('meowchat_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return { success: true, plan };
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      hasRole,
      isAdmin,
      isManager,
      updateSubscription,
      ROLES,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
