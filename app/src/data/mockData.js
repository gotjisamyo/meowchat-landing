// Mock Data for MeowChat Admin Dashboard

export const kpiData = [
  { id: 1, title: 'รายได้รวม', value: '฿2.4M', change: '+12.5%', isPositive: true, icon: 'wallet', color: 'bg-green-500' },
  { id: 2, title: 'ลูกค้าทั้งหมด', value: '8,432', change: '+8.2%', isPositive: true, icon: 'users', color: 'bg-blue-500' },
  { id: 3, title: 'API Calls วันนี้', value: '24,891', change: '+5.7%', isPositive: true, icon: 'api', color: 'bg-purple-500' },
  { id: 4, title: 'Credits คงเหลือ', value: '฿15,420', change: '-2.3%', isPositive: false, icon: 'credit-card', color: 'bg-yellow-500' },
  { id: 5, title: 'อัตราการแปลง', value: '3.2%', change: '+0.4%', isPositive: true, icon: 'trending-up', color: 'bg-pink-500' },
];

export const revenueData = [
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

export const apiUsageData = [
  { day: 'จ.', calls: 18500 },
  { day: 'อ.', calls: 22300 },
  { day: 'พ.', calls: 19800 },
  { day: 'พฤ', calls: 24100 },
  { day: 'ศ.', calls: 26800 },
  { day: 'ส.', calls: 22900 },
  { day: 'อา.', calls: 15200 },
];

export const salesByCategory = [
  { name: 'AI Chatbot', value: 45, color: '#FF6B35' },
  { name: 'LINE Bot', value: 30, color: '#F7C548' },
  { name: 'API Services', value: 15, color: '#3B82F6' },
  { name: 'อื่นๆ', value: 10, color: '#6B7280' },
];

export const userGrowthData = [
  { month: 'ม.ค.', users: 4200 },
  { month: 'ก.พ.', users: 4800 },
  { month: 'มี.ค.', users: 5200 },
  { month: 'เม.ย.', users: 5800 },
  { month: 'พ.ค.', users: 6400 },
  { month: 'มิ.ย.', users: 7100 },
  { month: 'ก.ค.', users: 7600 },
  { month: 'ส.ค.', users: 8100 },
  { month: 'ก.ย.', users: 8200 },
  { month: 'ต.ค.', users: 8350 },
  { month: 'พ.ย.', users: 8380 },
  { month: 'ธ.ค.', users: 8432 },
];

export const recentTransactions = [
  { id: 1, customer: 'บริษัท สยามฟู้ดส์ จำกัด', amount: '฿15,000', status: 'completed', date: '19 มี.ค. 2026' },
  { id: 2, customer: 'ร้านกาแฟคุณา', amount: '฿3,500', status: 'pending', date: '19 มี.ค. 2026' },
  { id: 3, customer: 'ห้างสรรพสินค้าเจริญ', amount: '฿28,000', status: 'completed', date: '18 มี.ค. 2026' },
  { id: 4, customer: 'ธุรกิจครอบครัว', amount: '฿1,200', status: 'completed', date: '18 มี.ค. 2026' },
  { id: 5, customer: 'ร้านอาหารซีฟู้ด', amount: '฿8,500', status: 'failed', date: '17 มี.ค. 2026' },
];

export const topProducts = [
  { id: 1, name: 'AI Assistant Pro', sales: 234, revenue: '฿468,000' },
  { id: 2, name: 'LINE Bot Premium', sales: 189, revenue: '฿378,000' },
  { id: 3, name: 'API Bundle', sales: 156, revenue: '฿234,000' },
  { id: 4, name: 'Chat Widget', sales: 98, revenue: '฿98,000' },
  { id: 5, name: 'Analytics Pack', sales: 67, revenue: '฿67,000' },
];

export const apiEndpointUsage = [
  { endpoint: '/api/chat', calls: 125000, avgTime: '45ms' },
  { endpoint: '/api/users', calls: 89000, avgTime: '32ms' },
  { endpoint: '/api/orders', calls: 67000, avgTime: '28ms' },
  { endpoint: '/api/analytics', calls: 45000, avgTime: '120ms' },
  { endpoint: '/api/webhooks', calls: 23000, avgTime: '15ms' },
];

export const financeData = {
  totalRevenue: 3650000,
  totalCost: 1800000,
  netProfit: 1850000,
  profitMargin: 50.7,
  monthlyExpenses: [
    { category: 'เซิร์ฟเวอร์', amount: 45000 },
    { category: 'API', amount: 35000 },
    { category: 'การตลาด', amount: 25000 },
    { category: 'เงินเดือน', amount: 80000 },
    { category: 'อื่นๆ', amount: 15000 },
  ],
};

export const marketingData = {
  campaigns: [
    { name: 'Summer Sale', leads: 1234, conversion: 4.2, status: 'active' },
    { name: 'LINE Ad', leads: 890, conversion: 3.8, status: 'active' },
    { name: 'Facebook', leads: 567, conversion: 2.1, status: 'paused' },
  ],
  channels: [
    { name: 'LINE', users: 4500, percentage: 53 },
    { name: 'Facebook', users: 2100, percentage: 25 },
    { name: 'เว็บไซต์', users: 1400, percentage: 17 },
    { name: 'แนะนำ', users: 432, percentage: 5 },
  ],
};

// ============== Subscription & Customer Data ==============

// Subscription Plans Data
export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'สำหรับผู้เริ่มต้น',
    features: [
      'Chatbot 1 ตัว',
      '100 ข้อความ/เดือน (≈3 แชท/วัน)',
      'Basic Analytics',
      'Email Support',
      '1 Team Member',
    ],
    notIncluded: [
      'LINE Integration',
      'Custom Branding',
      'Priority Support',
      'Advanced Analytics',
    ],
    cta: 'เริ่มต้นฟรี',
    popular: false,
    color: 'gray',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 590,
    period: 'เดือน',
    description: 'สำหรับธุรกิจที่กำลังเติบโต',
    features: [
      'Chatbot 5 ตัว (ตั้งค่าเอง)',
      '10,000 ข้อความ/เดือน (≈330 แชท/วัน)',
      'LINE OA Integration',
      'Advanced Analytics',
      'Custom Branding',
      'Priority Support',
      '5 Team Members',
      'Webhook Integration',
      'Human Handoff (โอนให้คนตอบ)',
    ],
    notIncluded: [
      'Unlimited ข้อความ',
      'Dedicated Support',
    ],
    cta: 'อัพเกรดเป็น Pro',
    popular: true,
    color: 'orange',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 1990,
    period: 'เดือน',
    description: 'สำหรับองค์กรขนาดใหญ่',
    features: [
      'Chatbot ไม่จำกัด',
      'ข้อความไม่จำกัด',
      'Advanced Analytics',
      'LINE Integration',
      'Custom Branding',
      '24/7 Dedicated Support',
      'Unlimited Team Members',
      'Webhook Integration',
      'Custom Integrations',
      'SLA Guarantee',
      'Dedicated Account Manager',
      'Facebook Messenger (เร็วๆ นี้)',
      'Instagram DM (เร็วๆ นี้)',
    ],
    notIncluded: [],
    cta: 'ติดต่อฝ่ายขาย',
    popular: false,
    color: 'purple',
  },
];

// Mock Customers with Tags
export const customersData = [
  { 
    id: 1, 
    name: 'บริษัท สยามฟู้ดส์ จำกัด', 
    email: 'contact@siamfoods.com',
    plan: 'enterprise',
    status: 'active',
    tags: ['VIP', 'Active'],
    revenue: 119880,
    joinDate: '2025-01-15',
    lastActive: '2026-03-19',
    apiCalls: 15420,
  },
  { 
    id: 2, 
    name: 'ร้านกาแฟคุณา', 
    email: 'owner@kancha.coffee',
    plan: 'pro',
    status: 'active',
    tags: ['Active'],
    revenue: 3588,
    joinDate: '2025-06-20',
    lastActive: '2026-03-18',
    apiCalls: 8230,
  },
  { 
    id: 3, 
    name: 'ห้างสรรพสินค้าเจริญ', 
    email: 'it@charoen.com',
    plan: 'enterprise',
    status: 'active',
    tags: ['VIP', 'Active'],
    revenue: 239760,
    joinDate: '2024-08-10',
    lastActive: '2026-03-19',
    apiCalls: 45000,
  },
  { 
    id: 4, 
    name: 'ธุรกิจครอบครัว', 
    email: 'business@family.co',
    plan: 'free',
    status: 'churned',
    tags: ['Churned'],
    revenue: 0,
    joinDate: '2025-03-01',
    lastActive: '2025-09-15',
    apiCalls: 50,
  },
  { 
    id: 5, 
    name: 'ร้านอาหารซีฟู้ด', 
    email: 'seafood@restaurant.th',
    plan: 'pro',
    status: 'active',
    tags: ['New', 'Active'],
    revenue: 3588,
    joinDate: '2026-02-28',
    lastActive: '2026-03-17',
    apiCalls: 2100,
  },
  { 
    id: 6, 
    name: 'สตาร์แมสซาจ์', 
    email: 'admin@starmassage.com',
    plan: 'pro',
    status: 'active',
    tags: ['Active'],
    revenue: 3588,
    joinDate: '2025-11-05',
    lastActive: '2026-03-16',
    apiCalls: 6780,
  },
  { 
    id: 7, 
    name: 'Pet Shop สุขสันติ', 
    email: 'info@spetshop.th',
    plan: 'free',
    status: 'new',
    tags: ['New'],
    revenue: 0,
    joinDate: '2026-03-10',
    lastActive: '2026-03-18',
    apiCalls: 120,
  },
  { 
    id: 8, 
    name: 'โรงแรมทะเลทอง', 
    email: 'reservation@seagoldhotel.com',
    plan: 'enterprise',
    status: 'active',
    tags: ['VIP', 'Active'],
    revenue: 239760,
    joinDate: '2024-05-22',
    lastActive: '2026-03-19',
    apiCalls: 52000,
  },
  { 
    id: 9, 
    name: 'ร้านขายรถยนต์', 
    email: 'dealer@cardealer.th',
    plan: 'pro',
    status: 'churned',
    tags: ['Churned'],
    revenue: 3588,
    joinDate: '2025-04-18',
    lastActive: '2025-12-20',
    apiCalls: 4500,
  },
  { 
    id: 10, 
    name: 'คลินิกทันตกรรม', 
    email: 'dental@clinic.co',
    plan: 'pro',
    status: 'active',
    tags: ['Active'],
    revenue: 3588,
    joinDate: '2025-09-12',
    lastActive: '2026-03-15',
    apiCalls: 5200,
  },
];

// User's subscription data (for current user)
export const userSubscription = {
  plan: 'pro',
  status: 'active',
  startDate: '2025-06-15',
  nextBillingDate: '2026-04-15',
  amount: 590,
  paymentMethod: 'Credit Card',
  lastPayment: {
    date: '2026-03-15',
    amount: 590,
    status: 'completed',
  },
  usage: {
    apiCalls: 8230,
    apiLimit: 10000,
    chatbots: 3,
    chatbotLimit: 5,
    teamMembers: 2,
    teamLimit: 5,
  },
  paymentHistory: [
    { id: 1, date: '2026-03-15', amount: 590, status: 'completed', method: 'Credit Card' },
    { id: 2, date: '2026-02-15', amount: 590, status: 'completed', method: 'Credit Card' },
    { id: 3, date: '2026-01-15', amount: 590, status: 'completed', method: 'Credit Card' },
    { id: 4, date: '2025-12-15', amount: 590, status: 'completed', method: 'Credit Card' },
    { id: 5, date: '2025-11-15', amount: 590, status: 'completed', method: 'Credit Card' },
  ],
};

// User activity log
export const userActivityLog = [
  { id: 1, action: 'Login', timestamp: '2026-03-19 09:30:00', ip: '192.168.1.1' },
  { id: 2, action: 'Updated Chatbot', timestamp: '2026-03-19 09:45:00', details: 'Customer Support Bot' },
  { id: 3, action: 'Viewed Analytics', timestamp: '2026-03-19 10:00:00', details: 'Sales Dashboard' },
  { id: 4, action: 'API Call', timestamp: '2026-03-19 10:15:23', details: '/api/chat - 125 calls' },
  { id: 5, action: 'Export Data', timestamp: '2026-03-18 16:00:00', details: 'Monthly Report' },
  { id: 6, action: 'Changed Plan', timestamp: '2026-03-01 14:00:00', details: 'Free → Pro' },
  { id: 7, action: 'Added Team Member', timestamp: '2026-02-28 11:00:00', details: 'new.user@company.com' },
  { id: 8, action: 'Login', timestamp: '2026-02-28 10:00:00', ip: '192.168.1.1' },
];

// Subscription Stats for Admin Dashboard
export const subscriptionStats = {
  total: 8432,
  active: 7654,
  churned: 778,
  newThisMonth: 234,
  revenue: {
    monthly: 2450000,
    yearly: 29400000,
    avgPerUser: 290,
  },
  byPlan: {
    free: 4123,
    pro: 3209,
    enterprise: 1100,
  },
  churnRate: 2.1,
  growthRate: 8.5,
};

// Tag colors
export const tagColors = {
  'VIP': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'New': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Active': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Churned': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};
