import { useState } from 'react';
import { 
  User, Bell, Shield, Palette, Key, 
  ChevronRight, Save, Upload, Eye, EyeOff, Trash2, RotateCcw, X
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function Settings({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'api-keys', label: 'API Keys', icon: Key },
  ];

  return (
    <PageLayout 
      title="Settings" 
      subtitle="Manage your account and app preferences" 
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          {/* Reset Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:text-red-400 hover:border-red-500/30">
             <RotateCcw className="w-4 h-4" /> Reset
          </button>
          
          {/* Cancel Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <X className="w-4 h-4" /> Cancel
          </button>
          
          {/* Save Changes Button */}
          <button className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 shadow-lg shadow-orange-500/20">
             <Save className="w-4 h-4" /> Save Changes
          </button>
        </>
      }
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Tabs Sidebar */}
        <div className="lg:w-72 flex-shrink-0 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-200 group
                  ${isActive ? 'text-white' : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'}
                `}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.03) 100%)',
                  border: '1px solid rgba(255, 107, 53, 0.15)'
                } : {
                  border: '1px solid transparent'
                }}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-orange-400' : 'group-hover:text-zinc-400'}`} />
                  <span className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>{tab.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-orange-400" />}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 lg:p-8">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'appearance' && <AppearanceTab />}
          {activeTab === 'api-keys' && <ApiKeysTab />}
        </div>
      </div>
    </PageLayout>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-white/[0.04]">
        <div className="relative group">
          <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-4xl font-extrabold text-white shadow-xl shadow-amber-500/20">
            ก
          </div>
          <button className="absolute -bottom-2 -right-2 p-3 bg-[#12121A] border-2 border-[#0A0A0F] rounded-2xl text-orange-400 hover:text-white hover:bg-white/[0.06] transition-all shadow-lg group-hover:scale-110">
            <Upload className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h5 className="text-2xl font-bold text-white mb-1">กฤษฐาพงศ์</h5>
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">CEO & System Architect</p>
          <button className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-4 transition-colors">Remove Avatar</button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block pl-1">Full Name</label>
          <input 
            type="text" 
            defaultValue="กฤษฐาพงศ์" 
            className="input-premium w-full" 
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block pl-1">Email Address</label>
          <input 
            type="email" 
            defaultValue="ceo@meowchat.ai" 
            className="input-premium w-full" 
          />
        </div>
        <div className="md:col-span-2 space-y-2.5">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block pl-1">Bio / Description</label>
          <textarea 
            rows={4} 
            defaultValue="Building the next generation of AI-driven customer support tools." 
            className="input-premium w-full resize-none" 
          />
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const settings = [
    { title: 'Email Notifications', desc: 'Receive daily digests and weekly reports', enabled: true },
    { title: 'Browser Push', desc: 'Real-time alerts for critical failures', enabled: true },
    { title: 'SMS Alerts', desc: 'Mobile alerts for security incidents', enabled: false },
    { title: 'Slack Integration', desc: 'Send metric updates to designated channels', enabled: true },
  ];
  
  return (
    <div className="space-y-6">
      <h5 className="text-xl font-bold text-white mb-6">Notification Preferences</h5>
      <div className="space-y-3">
        {settings.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.06] transition-all group">
            <div className="pr-4">
              <p className="font-semibold text-white mb-0.5 group-hover:text-orange-400 transition-colors">{s.title}</p>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{s.desc}</p>
            </div>
            <button 
              className={`w-12 h-7 rounded-full p-1 transition-all duration-300 ${s.enabled ? 'bg-orange-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${s.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-8">
      <h5 className="text-xl font-bold text-white mb-6">Security Settings</h5>
      
      {/* Password Section */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h6 className="font-semibold text-white">Password</h6>
            <p className="text-xs text-zinc-500 mt-1">Last changed 30 days ago</p>
          </div>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-white/[0.08] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-all">
            Change Password
          </button>
        </div>
      </div>
      
      {/* Two-Factor */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="font-semibold text-white">Two-Factor Authentication</h6>
            <p className="text-xs text-zinc-500 mt-1">Add an extra layer of security</p>
          </div>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all">
            Enable 2FA
          </button>
        </div>
      </div>
      
      {/* Sessions */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <h6 className="font-semibold text-white mb-4">Active Sessions</h6>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">Current Session</p>
                <p className="text-xs text-zinc-500">Chrome on macOS • Bangkok</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">Active now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppearanceTab() {
  const themes = [
    { id: 'dark', label: 'Dark Mode', selected: true },
    { id: 'light', label: 'Light Mode', selected: false },
    { id: 'system', label: 'System', selected: false },
  ];
  
  return (
    <div className="space-y-8">
      <h5 className="text-xl font-bold text-white mb-6">Appearance Settings</h5>
      
      {/* Theme Selection */}
      <div>
        <h6 className="text-sm font-semibold text-zinc-400 mb-4">Theme</h6>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`p-4 rounded-2xl border transition-all ${
                theme.selected 
                  ? 'bg-orange-500/10 border-orange-500/30 text-white' 
                  : 'bg-white/[0.02] border-white/[0.04] text-zinc-400 hover:border-white/[0.08]'
              }`}
            >
              <span className="text-sm font-semibold">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Accent Color */}
      <div>
        <h6 className="text-sm font-semibold text-zinc-400 mb-4">Accent Color</h6>
        <div className="flex gap-3">
          {['#FF6B35', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'].map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-xl transition-all ${
                color === '#FF6B35' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#12121A]' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <div>
          <h6 className="font-semibold text-white">Collapsed Sidebar</h6>
          <p className="text-xs text-zinc-500 mt-1">Start with collapsed sidebar by default</p>
        </div>
        <button className="w-12 h-7 rounded-full p-1 bg-zinc-700 transition-all duration-300">
          <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-0" />
        </button>
      </div>
    </div>
  );
}

function ApiKeysTab() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold text-white">API Keys</h5>
        <button className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold">
          Create New Key
        </button>
      </div>
      
      {/* API Keys List */}
      <div className="space-y-3">
        {[
          { name: 'Production Key', key: 'mc_live_**********************', lastUsed: '2 hours ago' },
          { name: 'Development Key', key: 'mc_test_**********************', lastUsed: '5 days ago' },
        ].map((apiKey, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.06] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <h6 className="font-semibold text-white">{apiKey.name}</h6>
              <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <code className="text-xs font-mono text-zinc-500 bg-white/[0.03] px-3 py-1.5 rounded-lg">{apiKey.key}</code>
              <button className="p-1.5 text-zinc-500 hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-500">Last used: {apiKey.lastUsed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
