import { useState } from 'react';
import { Lock, Shield, Eye, EyeOff } from 'lucide-react';

export default function SuperAdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a brief check
    setTimeout(() => {
      if (password === 'meowchat-admin-2026') {
        localStorage.setItem('superadminToken', 'meowchat-admin-2026');
        onSuccess();
      } else {
        setError('รหัสผ่านไม่ถูกต้อง');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">MeowChat Admin</h1>
          <p className="text-zinc-500 text-sm mt-1">Super Admin Control Panel</p>
        </div>

        {/* Warning banner */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
          <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-xs">ห้ามเข้าถึงหากไม่ได้รับอนุญาต</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-2">รหัสผ่าน</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-900 disabled:text-red-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                เข้าสู่ระบบ Admin
              </>
            )}
          </button>
        </form>

        <p className="text-center text-zinc-700 text-xs mt-6">
          MeowChat Super Admin v2026 · Internal Use Only
        </p>
      </div>
    </div>
  );
}
