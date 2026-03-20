import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2, Cat, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('กรุณากรอกชื่อร้านหรือชื่อของคุณ');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('รูปแบบอีเมลไม่ถูกต้อง');
    if (form.password.length < 6) return setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
    if (form.password !== form.confirm) return setError('รหัสผ่านไม่ตรงกัน');
    setIsLoading(true);
    // TODO: call real API when backend is deployed
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-violet-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 mb-4 shadow-lg shadow-pink-500/20">
            <Cat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">สมัครใช้งาน MeowChat</h1>
          <p className="text-gray-400 text-sm">ทดลองฟรี 14 วัน ไม่ต้องใช้บัตรเครดิต</p>
        </div>

        <div className="bg-[#151520]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
          {success ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-white font-bold text-xl mb-2">สมัครสำเร็จ!</h2>
              <p className="text-gray-400 text-sm">กำลังพาไปหน้าเข้าสู่ระบบ...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ชื่อร้าน / ชื่อของคุณ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input type="text" value={form.name} onChange={set('name')}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                    placeholder="ร้านแมวส้ม" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">อีเมล</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input type="email" value={form.email} onChange={set('email')}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                    placeholder="you@example.com" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">เบอร์โทรศัพท์ <span className="text-gray-500">(ไม่บังคับ)</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-500" />
                  </div>
                  <input type="tel" value={form.phone} onChange={set('phone')}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                    placeholder="08x-xxx-xxxx" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">รหัสผ่าน</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={set('password')}
                    className="w-full pl-10 pr-12 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                    placeholder="อย่างน้อย 6 ตัวอักษร" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors">
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
                  <input type="password" value={form.confirm} onChange={set('confirm')}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                    placeholder="••••••••" />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <button type="submit" disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20">
                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" />กำลังสมัคร...</> : 'สมัครใช้งานฟรี 🐾'}
              </button>

              <p className="text-center text-xs text-gray-500 mt-2">
                มีบัญชีแล้ว?{' '}
                <a href="/login" className="text-pink-400 hover:text-pink-300 transition-colors">เข้าสู่ระบบ</a>
              </p>
            </form>
          )}
        </div>

        <p className="text-center mt-6 text-gray-500 text-xs">© 2026 MeowChat. All rights reserved.</p>
      </div>
    </div>
  );
}
