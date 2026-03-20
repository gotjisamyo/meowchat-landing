import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// User roles
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

// Mock user data with roles
const MOCK_USERS = {
  'admin@meowchat.ai': {
    id: 1,
    name: 'กฤษฐาพงศ์',
    email: 'admin@meowchat.ai',
    role: ROLES.ADMIN,
    avatar: null,
    subscription: {
      plan: 'enterprise',
      status: 'active',
    },
  },
  'manager@meowchat.ai': {
    id: 2,
    name: 'สมชาย วงศ์สกุล',
    email: 'manager@meowchat.ai',
    role: ROLES.MANAGER,
    avatar: null,
    subscription: {
      plan: 'pro',
      status: 'active',
    },
  },
  'user@meowchat.ai': {
    id: 3,
    name: 'สมหญิง ใจดี',
    email: 'user@meowchat.ai',
    role: ROLES.USER,
    avatar: null,
    subscription: {
      plan: 'free',
      status: 'active',
    },
  },
  'ceo@meowchat.ai': {
    id: 1,
    name: 'กฤษฐาพงศ์',
    email: 'ceo@meowchat.ai',
    role: ROLES.ADMIN,
    avatar: null,
    subscription: {
      plan: 'enterprise',
      status: 'active',
    },
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const mockUser = MOCK_USERS[normalizedEmail];
        
        if (mockUser && password === 'admin123') {
          const token = 'mock_jwt_token_' + Date.now();
          localStorage.setItem('meowchat_token', token);
          localStorage.setItem('meowchat_user', JSON.stringify(mockUser));
          setUser(mockUser);
          setIsAuthenticated(true);
          resolve({ success: true, user: mockUser });
        } else if (mockUser && password === 'password123') {
          // Alternative password for demo
          const token = 'mock_jwt_token_' + Date.now();
          localStorage.setItem('meowchat_token', token);
          localStorage.setItem('meowchat_user', JSON.stringify(mockUser));
          setUser(mockUser);
          setIsAuthenticated(true);
          resolve({ success: true, user: mockUser });
        } else {
          reject(new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง'));
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('meowchat_token');
    localStorage.removeItem('meowchat_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  // Check if user is admin
  const isAdmin = () => hasRole(ROLES.ADMIN);

  // Check if user is manager or admin
  const isManager = () => hasRole(ROLES.MANAGER) || hasRole(ROLES.ADMIN);

  // Update user subscription (mock)
  const updateSubscription = async (plan) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = {
          ...user,
          subscription: {
            plan,
            status: 'active',
          },
        };
        localStorage.setItem('meowchat_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        resolve({ success: true, plan });
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated, 
      login, 
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
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
