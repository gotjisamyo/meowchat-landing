import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute - Component สำหรับป้องกัน routes ที่ต้อง login ก่อน
 * 
 * @param {ReactNode} children - Component ที่ต้องการป้องกัน
 * @param {string[]} allowedRoles - Roles ที่ allowed (optional)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // ระหว่างโหลด auth state ให้แสดง loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
          <p className="text-gray-400 text-sm">กำลังตรวจสอบการเข้าสู่ระบบ...</p>
        </div>
      </div>
    );
  }

  // ถ้ายังไม่ได้ login ให้ redirect ไปหน้า login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ถ้ามีการกำหนด allowedRoles ให้ตรวจสอบ role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user.role)) {
      return (
        <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
          <div className="text-center p-8 bg-[#151520] rounded-2xl border border-red-500/20 max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-3xl">🚫</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">ไม่มีสิทธิ์เข้าถึง</h2>
            <p className="text-gray-400">คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบ</p>
          </div>
        </div>
      );
    }
  }

  return children;
}
