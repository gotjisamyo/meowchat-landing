import { useState } from 'react';
import { 
  CreditCard, Calendar, Clock, Zap, Users, Bot, 
  ChevronRight, Download, CheckCircle, AlertCircle,
  Loader2, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { userSubscription, subscriptionPlans, userActivityLog } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Subscription({ setSidebarOpen }) {
  const { user, updateSubscription } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const currentPlan = subscriptionPlans.find(p => p.id === userSubscription.plan);
  const plans = subscriptionPlans.filter(p => p.id !== userSubscription.plan);

  const handleUpgrade = async (newPlanId) => {
    setIsUpgrading(true);
    await updateSubscription(newPlanId);
    setIsUpgrading(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <PageLayout
      title="Subscription"
      subtitle="จัดการการสมัครสมาชิกและการใช้งาน"
      setSidebarOpen={setSidebarOpen}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan Card */}
          <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-3xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-zinc-400 mb-1">แผมปัจจุบัน</p>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  {currentPlan?.name}
                  <span className={`
                    px-3 py-1 text-sm rounded-full capitalize
                    ${userSubscription.status === 'active' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }
                  `}>
                    {userSubscription.status}
                  </span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">฿{userSubscription.amount}</p>
                <p className="text-sm text-zinc-500">/เดือน</p>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <UsageCard 
                icon={Zap}
                label="API Calls"
                used={userSubscription.usage.apiCalls}
                limit={userSubscription.usage.apiLimit}
                color="orange"
              />
              <UsageCard 
                icon={Bot}
                label="Chatbots"
                used={userSubscription.usage.chatbots}
                limit={userSubscription.usage.chatbotLimit}
                color="purple"
              />
              <UsageCard 
                icon={Users}
                label="Team Members"
                used={userSubscription.usage.teamMembers}
                limit={userSubscription.usage.teamLimit}
                color="blue"
              />
            </div>

            {/* Next Billing */}
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm text-zinc-400">วันที่จะถูกเรียกเก็บเงิน</p>
                  <p className="font-semibold text-white">{formatDate(userSubscription.nextBillingDate)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">฿{userSubscription.amount}</p>
                <p className="text-sm text-zinc-500">{userSubscription.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">ประวัติการจ่ายเงิน</h3>
              <button className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            
            <div className="space-y-3">
              {userSubscription.paymentHistory.map((payment) => (
                <div 
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      ${payment.status === 'completed' ? 'bg-emerald-500/20' : 'bg-red-500/20'}
                    `}>
                      {payment.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{formatDate(payment.date)}</p>
                      <p className="text-sm text-zinc-500">{payment.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">฿{payment.amount}</p>
                    <p className="text-sm text-emerald-400 capitalize">{payment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">ประวัติการใช้งาน</h3>
            
            <div className="space-y-4">
              {userActivityLog.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-400" />
                  <div className="flex-1">
                    <p className="font-medium text-white">{activity.action}</p>
                    <p className="text-sm text-zinc-500">
                      {activity.timestamp}
                      {activity.ip && ` • IP: ${activity.ip}`}
                      {activity.details && ` • ${activity.details}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">จัดการแผม</h3>
            
            <div className="space-y-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isUpgrading}
                  className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] rounded-2xl transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{plan.name}</span>
                    <span className="text-orange-400 font-bold">฿{plan.price}/เดือน</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    {plan.id === 'pro' ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-purple-400" />
                    )}
                    <span>
                      {plan.id === 'pro' ? 'อัพเกรดจาก Free' : 'ดาวน์เกรดจาก Pro'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">วิธีการจ่ายเงิน</h3>
            
            <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Visa •••• 4242</p>
                <p className="text-sm text-zinc-500">หมดอายุ 12/28</p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </div>
          </div>

          {/* Help */}
          <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">ต้องการความช่วยเหลือ?</h3>
            <p className="text-sm text-zinc-400 mb-4">
              หากมีคำถามเกี่ยวกับการสมัครสมาชิก ติดต่อทีมสนับสนุนได้ตลอด 24 ชั่วโมง
            </p>
            <button className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-colors">
              ติดต่อทีมสนับสนุน
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function UsageCard({ icon: Icon, label, used, limit, color }) {
  const percentage = getUsagePercentage(used, limit);
  const isHigh = percentage > 80;
  
  const colorClasses = {
    orange: 'from-orange-500 to-orange-400',
    purple: 'from-purple-500 to-violet-400',
    blue: 'from-blue-500 to-cyan-400',
  };

  return (
    <div className="p-4 bg-black/20 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className={`text-xs font-medium ${isHigh ? 'text-red-400' : 'text-zinc-400'}`}>
          {percentage}%
        </span>
      </div>
      <div className="mb-2">
        <span className="text-xl font-bold text-white">{used.toLocaleString()}</span>
        <span className="text-sm text-zinc-500"> / {limit.toLocaleString()}</span>
      </div>
      <p className="text-xs text-zinc-500">{label}</p>
      <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
