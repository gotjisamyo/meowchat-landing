import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2, Cat, Building2 } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', businessName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email format
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setError('รูปแบบอีเมลไม่ถูกต้อง');
    }
    // Validate businessName
    if (!form.businessName.trim()) {
      return setError('กรุณากรอกชื่อธุรกิจ');
    }
    // Validate password min 8 chars
    if (form.password.length < 8) {
      return setError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
    }
    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      return setError('รหัสผ่านไม่ตรงกัน');
    }

    setIsLoading(true);
    try {
      const result = await register(form.email, form.password, form.businessName);
      setIsLoading(false);
      setSuccess(true);
      // If API returned token → auto-login → go to onboarding
      // Otherwise fallback to login page
      if (result.token) {
        setTimeout(() => navigate('/onboarding'), 1500);
      } else {
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.message || 'สมัครไม่สำเร็จ กรุณาลองใหม่');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-600/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg shadow-orange-500/20">
            <Cat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">สมัครใช้งาน MeowChat</h1>
          <p className="text-gray-400 text-sm">ทดลองฟรี 14 วัน ไม่ต้องใช้บัตรเครดิต</p>
        </div>

        {/* Register Card */}
        <div className="bg-[#12121A] backdrop-blur-xl rounded-2xl border border-white/[0.06] p-6 shadow-2xl">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-white font-bold text-xl mb-2">สมัครสำเร็จ!</h2>
              <p className="text-gray-400 text-sm">ยินดีต้อนรับสู่ MeowChat</p>
              <p className="text-gray-500 text-xs mt-2">กำลังพาไปตั้งค่าบอท...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ชื่อธุรกิจ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={set('businessName')}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    placeholder="ร้านแมวส้ม"
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">อีเมล</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">รหัสผ่าน</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    className="w-full pl-10 pr-12 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    placeholder="อย่างน้อย 8 ตัวอักษร"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ยืนยันรหัสผ่าน</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={set('confirmPassword')}
                    className="w-full pl-10 pr-12 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    กำลังสมัคร...
                  </>
                ) : (
                  'สมัครใช้งานฟรี'
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-500 mt-2">
                มีบัญชีแล้ว?{' '}
                <a href="/login" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">
                  เข้าสู่ระบบ
                </a>
              </p>
            </form>
          )}
        </div>

        <p className="text-center mt-6 text-gray-500 text-xs">
          © 2026 MeowChat. All rights reserved. &nbsp;·&nbsp;
          <a href="https://meowchat.store/privacy.html" className="hover:text-gray-300 transition-colors">นโยบายความเป็นส่วนตัว</a>
          &nbsp;·&nbsp;
          <a href="https://meowchat.store/terms.html" className="hover:text-gray-300 transition-colors">ข้อกำหนดการใช้บริการ</a>
        </p>
      </div>
    </div>
  );
}
