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

export const ordersData = [
  { id: 'MC-001', customer: 'คุณแนน', avatar: 'น', color: '#FF6B35', items: 'เสื้อยืด Oversize x2', total: 598, status: 'new', time: '09:15', address: '123 ถ.สุขุมวิท กรุงเทพฯ' },
  { id: 'MC-002', customer: 'พี่บอล', avatar: 'บ', color: '#8B5CF6', items: 'กางเกง Jogger x1, หมวก x1', total: 658, status: 'new', time: '09:30', address: '456 ถ.พระราม 4 กรุงเทพฯ' },
  { id: 'MC-003', customer: 'น้องฝ้าย', avatar: 'ฝ', color: '#10B981', items: 'Set ประหยัด x2', total: 1398, status: 'preparing', time: '08:45', address: '789 ถ.รัชดา กรุงเทพฯ' },
  { id: 'MC-004', customer: 'คุณมาย', avatar: 'ม', color: '#F59E0B', items: 'เสื้อยืด x1', total: 299, status: 'preparing', time: '08:00', address: '321 ถ.ลาดพร้าว กรุงเทพฯ' },
  { id: 'MC-005', customer: 'พี่โอ้', avatar: 'โ', color: '#3B82F6', items: 'กางเกง x3', total: 1377, status: 'shipped', time: '07:30', tracking: 'KEX123456789', address: '654 ถ.งามวงศ์วาน นนทบุรี' },
  { id: 'MC-006', customer: 'คุณนิ่ม', avatar: 'น', color: '#EC4899', items: 'ถุงผ้า x2', total: 298, status: 'shipped', time: '07:00', tracking: 'JNT987654321', address: '987 ถ.บางนา กรุงเทพฯ' },
  { id: 'MC-007', customer: 'แม่ค้าออนไลน์', avatar: 'อ', color: '#6366F1', items: 'เสื้อยืด x5, กางเกง x2', total: 2413, status: 'done', time: 'เมื่อวาน', address: '147 ถ.เพชรบุรี กรุงเทพฯ' },
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
      'ข้อความ 300/เดือน',
      'LINE Official Account 1 บัญชี',
      'AI เข้าใจภาษาไทย',
      'Dashboard พื้นฐาน',
      '1 Team Member',
    ],
    notIncluded: [
      'Human Handoff',
      'Custom Branding',
      'Priority Support',
      'Advanced Analytics',
    ],
    cta: 'สมัครฟรี ไม่ต้องใส่บัตร',
    popular: false,
    color: 'gray',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 199,
    period: 'เดือน',
    description: 'สำหรับผู้เริ่มต้นธุรกิจ',
    features: [
      'ข้อความ 2,000/เดือน (≈65 แชท/วัน)',
      'LINE Official Account 1 บัญชี',
      'AI เข้าใจภาษาไทย',
      'Dashboard พื้นฐาน',
      '2 Team Members',
    ],
    notIncluded: [
      'Human Handoff',
      'Custom Branding',
      'Advanced Analytics',
    ],
    cta: 'สมัคร Starter',
    popular: false,
    color: 'blue',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 590,
    period: 'เดือน',
    description: 'สำหรับธุรกิจที่กำลังเติบโต',
    features: [
      'ข้อความ 10,000/เดือน (≈330 แชท/วัน)',
      'LINE Official Account 3 บัญชี',
      'Human Handoff (โอนให้คนตอบ)',
      'Advanced Analytics',
      'Custom Branding',
      'Priority Support',
      '5 Team Members',
      'Webhook Integration',
    ],
    notIncluded: [
      'Unlimited Messages',
      'Dedicated Support',
    ],
    cta: 'ทดลองใช้ Pro ฟรี 14 วัน',
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
      'ข้อความไม่จำกัด',
      'LINE Official Account ไม่จำกัด',
      'Facebook Messenger (เร็วๆ นี้)',
      'Instagram DM (เร็วๆ นี้)',
      'Multi-branch หลายสาขา',
      'Human Handoff ไม่จำกัด',
      'API Integration + Webhook',
      'Advanced Analytics + Reports',
      'SLA Guarantee',
      'Dedicated Account Manager',
      'ทีม Support ส่วนตัว 24/7',
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
    monthly: 95490,
    yearly: 1145880,
    avgPerUser: 729, // 95490 / 131 paying users (118 Pro + 13 Enterprise)
  },
  byPlan: {
    free: 4123,
    pro: 3209,
    enterprise: 1100,
  },
  churnRate: 2.1,
  growthRate: 8.5,
};

// ============== Store Knowledge Base Data ==============

export const storeProducts = [
  { id: 1, name: 'เสื้อยืด Oversize', price: 299, unit: 'ตัว', category: 'เสื้อผ้า', stock: 45, active: true, description: 'ผ้า Cotton 100% มีไซส์ S-XL' },
  { id: 2, name: 'กางเกง Jogger', price: 459, unit: 'ตัว', category: 'เสื้อผ้า', stock: 23, active: true, description: 'ผ้า Polyester นุ่ม ใส่สบาย' },
  { id: 3, name: 'Set ประหยัด (เสื้อ+กางเกง)', price: 699, unit: 'ชุด', category: 'เสื้อผ้า', stock: 10, active: true, description: 'ประหยัดกว่าซื้อแยก ฿59' },
  { id: 4, name: 'หมวก Cap', price: 199, unit: 'ใบ', category: 'อุปกรณ์เสริม', stock: 0, active: false, description: 'หมดชั่วคราว รอสต็อกใหม่' },
  { id: 5, name: 'ถุงผ้า Tote', price: 149, unit: 'ใบ', category: 'อุปกรณ์เสริม', stock: 88, active: true, description: 'ผ้า Canvas พิมพ์ลาย' },
];

export const storeFAQs = [
  { id: 1, q: 'ส่งได้ที่ไหนบ้าง?', a: 'ส่งทั่วประเทศไทยครับ ใช้ Kerry/J&T ค่าส่งเริ่ม ฿50' },
  { id: 2, q: 'ชำระเงินยังไงได้บ้าง?', a: 'โอนแบงก์, PromptPay, บัตรเครดิตครับ' },
  { id: 3, q: 'รับของกี่วัน?', a: '2-3 วันทำการครับ กรุงเทพฯ วันถัดไป' },
  { id: 4, q: 'คืนสินค้าได้ไหม?', a: 'คืนได้ภายใน 7 วัน สินค้าต้องไม่ผ่านการใช้งานครับ' },
  { id: 5, q: 'มีของพรุ่งนี้ไหม?', a: 'สต็อกอัพเดทเรียลไทม์ครับ ถ้าแสดงว่ามี แปลว่ามีครับ' },
];

// ============== Chatbot Data ==============

export const chatbotsData = [
  {
    id: 1,
    botName: 'Customer Support Bot',
    status: 'active',
    messagesThisMonth: 3241,
    avgResponseTime: '1.2s',
    personality: {
      name: 'น้องมีม',
      avatar: '🐱',
      pronoun: 'หนู',
      tone: 'cute',
      traits: { friendly: 5, professional: 2, cute: 5, energetic: 4, warmth: 5 },
      greeting: 'สวัสดีค่ะ! หนูน้องมีมยินดีช่วยเหลือนะคะ 🐱✨',
      goodbye: 'ขอบคุณที่ใช้บริการนะคะ แวะมาใหม่ได้เสมอเลยค่ะ 💕',
      fallback: 'ขอโทษนะคะ หนูยังไม่เข้าใจ ลองถามใหม่อีกครั้งได้เลยค่ะ 🙏',
      upsell: 'มีสินค้าใหม่เข้ามาด้วยนะคะ อยากดูไหมคะ? 🛍️',
    },
  },
  {
    id: 2,
    botName: 'Sales Assistant',
    status: 'active',
    messagesThisMonth: 1890,
    avgResponseTime: '0.9s',
    personality: {
      name: 'น้องเซลส์',
      avatar: '👩',
      pronoun: 'หนู',
      tone: 'professional',
      traits: { friendly: 4, professional: 5, cute: 2, energetic: 4, warmth: 3 },
      greeting: 'สวัสดีค่ะ ยินดีให้บริการและแนะนำสินค้าที่เหมาะกับคุณ',
      goodbye: 'ขอบคุณที่สนใจสินค้าของเรา หวังว่าจะได้ให้บริการอีกครั้งนะคะ',
      fallback: 'ขออภัยค่ะ กรุณาติดต่อเจ้าหน้าที่เพื่อข้อมูลเพิ่มเติม',
      upsell: 'สินค้าชิ้นนี้มีส่วนลดพิเศษวันนี้ อยากทราบรายละเอียดไหมคะ?',
    },
  },
  {
    id: 3,
    botName: 'FAQ Bot',
    status: 'inactive',
    messagesThisMonth: 0,
    avgResponseTime: '-',
    personality: {
      name: 'น้องรู้รอบ',
      avatar: '🤓',
      pronoun: 'ผม',
      tone: 'expert',
      traits: { friendly: 3, professional: 5, cute: 1, energetic: 3, warmth: 2 },
      greeting: 'สวัสดีครับ ผมน้องรู้รอบ พร้อมตอบคำถามทุกข้อด้วยข้อมูลที่ครบถ้วนและแม่นยำ',
      goodbye: 'ขอบคุณที่ใช้บริการครับ หากมีคำถามเพิ่มเติมยินดีให้บริการเสมอ',
      fallback: 'ขออภัยครับ คำถามนี้อยู่นอกเหนือฐานความรู้ของผม กรุณาติดต่อทีมงานโดยตรง',
      upsell: 'หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับแพ็กเกจพรีเมียม ผมสามารถอธิบายรายละเอียดได้ครับ',
    },
  },
];

// Tag colors
export const tagColors = {
  'VIP': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'New': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Active': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Churned': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};

// ============== CRM / LINE Chat Customer Data ==============

export const crmCustomers = [
  {
    id: 1,
    name: 'คุณแนน',
    lineId: '@nan_shop',
    lastChat: '2026-03-19T07:30:00',
    orders: 12,
    totalSpend: 4580,
    tags: ['VIP', 'ขาประจำ'],
    notes: 'ชอบเสื้อ oversize ไซส์ L',
    avatar: 'น',
    avatarColor: 'from-pink-500 to-rose-400',
    timeline: [
      { type: 'order', icon: '📦', text: 'เสื้อยืด Oversize x2 — ฿598', date: '2026-03-15T10:00:00' },
      { type: 'chat',  icon: '💬', text: 'ถามเรื่องไซส์', date: '2026-03-14T15:30:00' },
      { type: 'order', icon: '📦', text: 'กางเกง Jogger — ฿459', date: '2026-02-28T09:00:00' },
      { type: 'chat',  icon: '💬', text: 'สอบถามโปรโมชั่น', date: '2026-02-20T11:00:00' },
    ],
  },
  {
    id: 2,
    name: 'พี่โอ้',
    lineId: '@oh_bkk',
    lastChat: '2026-03-19T06:15:00',
    orders: 3,
    totalSpend: 1247,
    tags: ['ลูกค้าใหม่'],
    notes: '',
    avatar: 'โ',
    avatarColor: 'from-blue-500 to-cyan-400',
    timeline: [
      { type: 'order', icon: '📦', text: 'Set ประหยัด (เสื้อ+กางเกง) — ฿699', date: '2026-03-19T06:00:00' },
      { type: 'chat',  icon: '💬', text: 'ถามเรื่องการจัดส่ง', date: '2026-03-18T20:00:00' },
      { type: 'order', icon: '📦', text: 'เสื้อยืด Oversize — ฿299', date: '2026-03-10T14:00:00' },
    ],
  },
  {
    id: 3,
    name: 'น้องฝ้าย',
    lineId: '@fai2546',
    lastChat: '2026-03-18T20:00:00',
    orders: 8,
    totalSpend: 3200,
    tags: ['ขาประจำ'],
    notes: 'แพ้สีย้อม ควรแนะนำ natural only',
    avatar: 'ฝ',
    avatarColor: 'from-purple-500 to-violet-400',
    timeline: [
      { type: 'chat',  icon: '💬', text: 'ถามเรื่องสีของเสื้อ natural', date: '2026-03-18T20:00:00' },
      { type: 'order', icon: '📦', text: 'ถุงผ้า Tote x3 — ฿447', date: '2026-03-12T09:30:00' },
      { type: 'order', icon: '📦', text: 'เสื้อยืด Oversize — ฿299', date: '2026-02-25T13:00:00' },
      { type: 'chat',  icon: '💬', text: 'แจ้งว่าแพ้สีย้อม', date: '2026-02-24T18:00:00' },
    ],
  },
  {
    id: 4,
    name: 'คุณมาย',
    lineId: '@may_online',
    lastChat: '2026-03-18T14:30:00',
    orders: 1,
    totalSpend: 299,
    tags: [],
    notes: '',
    avatar: 'ม',
    avatarColor: 'from-emerald-500 to-teal-400',
    timeline: [
      { type: 'order', icon: '📦', text: 'เสื้อยืด Oversize — ฿299', date: '2026-03-18T14:00:00' },
      { type: 'chat',  icon: '💬', text: 'สอบถามราคา', date: '2026-03-18T13:30:00' },
    ],
  },
  {
    id: 5,
    name: 'พี่บอล',
    lineId: '@ball_store',
    lastChat: '2026-03-17T11:00:00',
    orders: 25,
    totalSpend: 9800,
    tags: ['VIP', 'ขาประจำ'],
    notes: 'ลูกค้า VIP ส่วนลด 10% เสมอ',
    avatar: 'บ',
    avatarColor: 'from-orange-500 to-amber-400',
    timeline: [
      { type: 'order', icon: '📦', text: 'Set ประหยัด x5 — ฿3,495', date: '2026-03-17T11:00:00' },
      { type: 'chat',  icon: '💬', text: 'ขอใบเสร็จ', date: '2026-03-17T10:30:00' },
      { type: 'order', icon: '📦', text: 'กางเกง Jogger x3 — ฿1,377', date: '2026-03-05T09:00:00' },
      { type: 'chat',  icon: '💬', text: 'ถามสต็อกสินค้า', date: '2026-03-04T16:00:00' },
      { type: 'order', icon: '📦', text: 'เสื้อยืด Oversize x4 — ฿1,196', date: '2026-02-20T10:00:00' },
    ],
  },
];

// CRM tag color map
export const crmTagColors = {
  'VIP':        { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'ขาประจำ':    { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  'ลูกค้าใหม่': { bg: 'bg-blue-500/20',   text: 'text-blue-400',   border: 'border-blue-500/30' },
};

// ============== Automation & Flow Data ==============

// ============== Chat Inbox Data ==============

export const chatInboxData = [
  {
    id: 1, status: 'bot', unread: 0,
    customer: { name: 'คุณแนน', avatar: 'น', color: '#FF6B35', lineId: '@nan_shop' },
    lastMessage: 'ขอบคุณนะคะ ได้รับแล้ว', lastTime: '08:45',
    tags: ['VIP'],
    messages: [
      { id:1, from:'customer', text:'สวัสดีค่ะ', time:'08:30' },
      { id:2, from:'bot', text:'สวัสดีครับ! 🐱 วันนี้ช่วยอะไรได้บ้างครับ?', time:'08:30' },
      { id:3, from:'customer', text:'มีเสื้อ oversize สีดำไหมคะ', time:'08:32' },
      { id:4, from:'bot', text:'มีครับ! ราคา ฿299 ทุกไซส์ S-XL ครับ 😊', time:'08:32' },
      { id:5, from:'customer', text:'ขอบคุณนะคะ ได้รับแล้ว', time:'08:45' },
    ],
  },
  {
    id: 2, status: 'waiting', unread: 2,
    customer: { name: 'พี่โอ้', avatar: 'โ', color: '#8B5CF6', lineId: '@oh_bkk' },
    lastMessage: 'อยากคุยกับคนได้ไหมครับ?', lastTime: '09:10',
    tags: [],
    messages: [
      { id:1, from:'customer', text:'อยากสั่งของจำนวนมาก ราคาขายส่งยังไง', time:'09:05' },
      { id:2, from:'bot', text:'ขออภัยครับ ขอส่งต่อให้เจ้าของร้านนะครับ ⚡', time:'09:05' },
      { id:3, from:'system', text:'น้องมีม ส่งต่อให้เจ้าของร้าน', time:'09:05' },
      { id:4, from:'customer', text:'อยากคุยกับคนได้ไหมครับ?', time:'09:10' },
    ],
  },
  {
    id: 3, status: 'human', unread: 0,
    customer: { name: 'น้องฝ้าย', avatar: 'ฝ', color: '#10B981', lineId: '@fai2546' },
    lastMessage: 'ได้เลยครับ รอสักครู่', lastTime: '09:20',
    tags: ['ขาประจำ'],
    messages: [
      { id:1, from:'customer', text:'มีโปรโมชั่นอะไรบ้างคะ', time:'09:15' },
      { id:2, from:'bot', text:'ซื้อ 2 ชิ้น ลด 15% ครับ 🎉', time:'09:15' },
      { id:3, from:'customer', text:'ซื้อ 5 ชิ้น ได้ส่วนลดพิเศษไหม', time:'09:17' },
      { id:4, from:'owner', text:'ได้เลยครับ รอสักครู่', time:'09:20' },
    ],
  },
];

export const automationTemplates = [
  { id: 1, icon: '🌅', name: 'ส่งข้อความต้อนรับ', description: 'ทักทายลูกค้าใหม่อัตโนมัติ', active: true },
  { id: 2, icon: '🛒', name: 'แจ้งยืนยันออเดอร์', description: 'ส่งสรุปออเดอร์ทันที', active: false },
  { id: 3, icon: '⏰', name: 'เตือนก่อนนัด', description: 'Reminder 1 วันก่อนนัด', active: false },
  { id: 4, icon: '💤', name: 'ตอบนอกเวลา', description: 'ตอบอัตโนมัติหลังปิดร้าน', active: true },
  { id: 5, icon: '🎂', name: 'อวยพรวันเกิด', description: 'ส่งโค้ดส่วนลดวันเกิด', active: false },
  { id: 6, icon: '🔄', name: 'ติดตามลูกค้าเงียบ', description: 'Re-engage ลูกค้าใน 30 วัน', active: false },
];
