import axios from 'axios';

// Base URL for API - ปรับตาม environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - เพิ่ม token ทุก request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('meowchat_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - จัดการ errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token หมดอายุ หรือไม่ valid
      localStorage.removeItem('meowchat_token');
      localStorage.removeItem('meowchat_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  logout: async () => {
    return Promise.resolve({ success: true });
  },
  
  getCurrentUser: async () => {
    const stored = localStorage.getItem('meowchat_user');
    return stored ? JSON.parse(stored) : null;
  },
};

// ==================== DASHBOARD APIs ====================

export const dashboardAPI = {
  getStats: async () => {
    // Mock data - ใน production จะใช้ API จริง
    return {
      totalCustomers: 8432,
      customersChange: 12.5,
      apiCallsToday: 24891,
      apiCallsChange: 8.2,
      creditsRemaining: 15420,
      creditsChange: 5.7,
      conversionRate: 3.2,
      conversionChange: -2.3,
    };
    
    // Real API call
    // const response = await api.get('/dashboard/stats');
    // return response.data;
  },
  
  getRevenueData: async () => {
    // Mock data
    return [
      { month: 'ม.ค.', revenue: 180000, cost: 120000 },
      { month: 'ก.พ.', revenue: 195000, cost: 125000 },
      { month: 'มี.ค.', revenue: 210000, cost: 130000 },
      { month: 'เม.ย.', revenue: 205000, cost: 128000 },
      { month: 'พ.ค.', revenue: 230000, cost: 135000 },
      { month: 'มิ.ย.', revenue: 245000, cost: 140000 },
      { month: 'ก.ค.', revenue: 260000, cost: 145000 },
      { month: 'ส.ค.', revenue: 275000, cost: 150000 },
      { month: 'ก.ย.', revenue: 290000, cost: 155000 },
      { month: 'ต.ค.', revenue: 310000, cost: 160000 },
      { month: 'พ.ย.', revenue: 335000, cost: 170000 },
      { month: 'ธ.ค.', revenue: 365000, cost: 180000 },
    ];
    
    // Real API call
    // const response = await api.get('/dashboard/revenue');
    // return response.data;
  },
  
  getRecentTransactions: async () => {
    // Mock data
    return [
      { id: 1, customer: 'บริษัท สยามฟู้ดส์ จำกัด', amount: '฿15,000', status: 'completed', date: '19 มี.ค. 2026' },
      { id: 2, customer: 'ร้านกาแฟคุณา', amount: '฿3,500', status: 'pending', date: '19 มี.ค. 2026' },
      { id: 3, customer: 'ห้างสรรพสินค้าเจริญ', amount: '฿28,000', status: 'completed', date: '18 มี.ค. 2026' },
      { id: 4, customer: 'ธุรกิจครอบครัว', amount: '฿1,200', status: 'completed', date: '18 มี.ค. 2026' },
      { id: 5, customer: 'ร้านอาหารซีฟู้ด', amount: '฿8,500', status: 'failed', date: '17 มี.ค. 2026' },
    ];
    
    // Real API call
    // const response = await api.get('/dashboard/transactions');
    // return response.data;
  },
};

// ==================== SALES APIs ====================

export const salesAPI = {
  getTopProducts: async () => {
    return [
      { id: 1, name: 'AI Chatbot Premium', sales: 1240, growth: '+15%', color: '#FF6B35' },
      { id: 2, name: 'API Enterprise Plan', sales: 850, growth: '+12%', color: '#F7C548' },
      { id: 3, name: 'Custom Integration', sales: 420, growth: '+8%', color: '#8B5CF6' },
    ];
  },
  
  getSalesMetrics: async () => {
    return {
      avgOrderValue: 1850,
      paymentGatewayUptime: 99.9,
      churnRate: 1.2,
    };
  },
};

// ==================== FINANCE APIs ====================

export const financeAPI = {
  getFinanceSummary: async () => {
    return {
      totalRevenue: 3650000,
      totalCost: 1800000,
      netProfit: 1850000,
      profitMargin: 50.7,
    };
  },
  
  getExpenses: async () => {
    return [
      { category: 'เซิร์ฟเวอร์', amount: 45000 },
      { category: 'API', amount: 35000 },
      { category: 'การตลาด', amount: 25000 },
      { category: 'เงินเดือน', amount: 80000 },
      { category: 'อื่นๆ', amount: 15000 },
    ];
  },
};

// ==================== MARKETING APIs ====================

export const marketingAPI = {
  getCampaigns: async () => {
    return [
      { name: 'Summer Sale', leads: 1234, conversion: 4.2, status: 'active' },
      { name: 'LINE Ad', leads: 890, conversion: 3.8, status: 'active' },
      { name: 'Facebook', leads: 567, conversion: 2.1, status: 'paused' },
    ];
  },
  
  getChannels: async () => {
    return [
      { name: 'LINE', users: 4500, percentage: 53 },
      { name: 'Facebook', users: 2100, percentage: 25 },
      { name: 'เว็บไซต์', users: 1400, percentage: 17 },
      { name: 'แนะนำ', users: 432, percentage: 5 },
    ];
  },
};

// ==================== API USAGE APIs ====================

export const apiUsageAPI = {
  getStats: async () => {
    return {
      totalRequests: 2400000,
      avgLatency: 45,
      uptime: 100.0,
      errorRate: 0.04,
    };
  },
  
  getEndpointUsage: async () => {
    return [
      { endpoint: '/api/chat', calls: 125000, avgTime: '45ms' },
      { endpoint: '/api/users', calls: 89000, avgTime: '32ms' },
      { endpoint: '/api/orders', calls: 67000, avgTime: '28ms' },
      { endpoint: '/api/analytics', calls: 45000, avgTime: '120ms' },
      { endpoint: '/api/webhooks', calls: 23000, avgTime: '15ms' },
    ];
  },
};

// Export default api instance
export default api;
