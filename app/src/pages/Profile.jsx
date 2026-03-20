import { useState } from 'react';
import { 
  User, Mail, Lock, Bell, Shield, CreditCard,
  Camera, Save, Loader2, CheckCircle, AlertCircle,
  Activity, Clock, LogOut
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useAuth } from '../context/AuthContext';
import { userSubscription, userActivityLog, subscriptionPlans } from '../data/mockData';

export default function Profile({ setSidebarOpen }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+66 81 234 5678',
    company: 'MeowChat Co., Ltd.',
    timezone: 'Asia/Bangkok',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    weekly: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'ข้อมูลโปรไฟล์', icon: User },
    { id: 'security', label: 'ความปลอดภัย', icon: Shield },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell },
    { id: 'billing', label: 'การเรียกเก็บเงิน', icon: CreditCard },
  ];

  const currentPlan = subscriptionPlans.find(p => p.id === userSubscription.plan);

  return (
    <PageLayout
      title="My Account"
      subtitle="จัดการข้อมูลและการตั้งค่าบัญชี"
      setSidebarOpen={setSidebarOpen}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
            {/* User Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold mx-auto">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-orange-400 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white">{user?.name || 'Admin'}</h3>
              <p className="text-sm text-zinc-500">{user?.email || 'admin@meowchat.com'}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                <Shield className="w-4 h-4" />
                <span className="capitalize">{user?.role || 'admin'}</span>
              </div>
            </div>

            {/* Current Plan */}
            <div className="p-4 bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl mb-6">
              <p className="text-xs text-zinc-400 mb-1">แผมปัจจุบัน</p>
              <p className="text-xl font-bold text-white">{currentPlan?.name}</p>
              <p className="text-sm text-orange-400">฿{currentPlan?.price}/เดือน</p>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive 
                        ? 'bg-orange-500/20 text-orange-400' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400">บันทึกการตั้งค่าสำเร็จ!</span>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">ข้อมูลโปรไฟล์</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="ชื่อ-นามสกุล"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    icon={User}
                  />
                  <FormField
                    label="อีเมล"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    icon={Mail}
                    type="email"
                  />
                  <FormField
                    label="เบอร์โทรศัพท์"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <FormField
                    label="บริษัท"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <FormField
                  label="Timezone"
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  icon={Clock}
                />

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">ความปลอดภัย</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="font-medium text-white">รหัสผ่าน</p>
                        <p className="text-sm text-zinc-500">เปลี่ยนรหัสผ่านของคุณ</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-white rounded-lg text-sm font-medium transition-colors">
                      เปลี่ยน
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-sm text-zinc-500">เพิ่มความปลอดภัยอีกขั้น</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors">
                      เปิดใช้งาน
                    </button>
                  </div>
                </div>

                {/* Recent Sessions */}
                <div>
                  <h4 className="font-semibold text-white mb-4">การเข้าสู่ระบบล่าสุด</h4>
                  <div className="space-y-3">
                    {userActivityLog.filter(a => a.action === 'Login').slice(0, 3).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-white">{session.ip}</p>
                            <p className="text-sm text-zinc-500">{session.timestamp}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                          ปัจจุบัน
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">การแจ้งเตือน</h3>
              
              <div className="space-y-4">
                <ToggleField
                  label="อีเมลแจ้งเตือน"
                  description="รับการแจ้งเตือนสำคัญทางอีเมล"
                  icon={Mail}
                  enabled={notifications.email}
                  onChange={() => setNotifications({...notifications, email: !notifications.email})}
                />
                <ToggleField
                  label="Push Notifications"
                  description="รับการแจ้งเตือนบนเบราว์เซอร์"
                  icon={Bell}
                  enabled={notifications.push}
                  onChange={() => setNotifications({...notifications, push: !notifications.push})}
                />
                <ToggleField
                  label="อีเมลส่งเสริมการขาย"
                  description="รับข่าวสารและโปรโมชั่นพิเศษ"
                  icon={Mail}
                  enabled={notifications.marketing}
                  onChange={() => setNotifications({...notifications, marketing: !notifications.marketing})}
                />
                <ToggleField
                  label="รายงานประจำสัปดาห์"
                  description="สรุปการใช้งานและสถิติรายสัปดาห์"
                  icon={Activity}
                  enabled={notifications.weekly}
                  onChange={() => setNotifications({...notifications, weekly: !notifications.weekly})}
                />
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  บันทึกการตั้งค่า
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">แผมปัจจุบัน</p>
                    <h3 className="text-2xl font-bold text-white">{currentPlan?.name}</h3>
                    <p className="text-zinc-400">฿{currentPlan?.price}/เดือน</p>
                  </div>
                  <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-colors">
                    เปลี่ยนแผม
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">วิธีการจ่ายเงิน</h3>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <div className="w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Visa •••• 4242</p>
                    <p className="text-sm text-zinc-500">หมดอายุ ธันวาคม 2028</p>
                  </div>
                  <button className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-white rounded-lg text-sm font-medium transition-colors">
                    แก้ไข
                  </button>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">ที่อยู่สำหรับใบแจ้งหนี้</h3>
                <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <p className="font-medium text-white">MeowChat Co., Ltd.</p>
                  <p className="text-zinc-400 text-sm mt-1">
                    123 ถนนสุขุมวิท<br />
                    กรุงเทพมหานคร 10110<br />
                    Thailand
                  </p>
                  <button className="mt-3 text-orange-400 hover:text-orange-300 text-sm font-medium">
                    แก้ไขที่อยู่
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

function FormField({ label, value, onChange, icon: Icon, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 bg-[#0A0A0F] border border-white/[0.06] rounded-xl text-white
            focus:outline-none focus:border-orange-500/50
            ${Icon ? 'pl-12' : ''}
          `}
        />
      </div>
    </div>
  );
}

function ToggleField({ label, description, icon: Icon, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
          <Icon className="w-5 h-5 text-zinc-400" />
        </div>
        <div>
          <p className="font-medium text-white">{label}</p>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`
          w-12 h-6 rounded-full transition-colors relative
          ${enabled ? 'bg-orange-500' : 'bg-zinc-600'}
        `}
      >
        <div 
          className={`
            absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
            ${enabled ? 'left-7' : 'left-1'}
          `}
        />
      </button>
    </div>
  );
}
