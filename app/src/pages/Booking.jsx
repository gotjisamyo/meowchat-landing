import { useState } from 'react';
import {
  Calendar, Clock, User, CheckCircle, XCircle, Bell, Plus,
  ChevronLeft, ChevronRight, X, Edit2, Trash2
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 'thai-massage-1h', label: 'นวดแผนไทย 1 ชม.', price: 350, duration: 60 },
  { id: 'shampoo',         label: 'สระผม',            price: 150, duration: 30 },
  { id: 'haircut',         label: 'ตัดผม',            price: 200, duration: 45 },
  { id: 'color',           label: 'ทำสี',             price: 800, duration: 120 },
  { id: 'other',           label: 'อื่นๆ',            price: 0,   duration: 60 },
];

const STATUS_CFG = {
  confirmed: { label: 'ยืนยันแล้ว',  bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  pending:   { label: 'รอยืนยัน',    bg: 'bg-yellow-500/10',  text: 'text-yellow-400',  border: 'border-yellow-500/20' },
  cancelled: { label: 'ยกเลิกแล้ว', bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/20' },
};

const INITIAL_BOOKINGS = [
  { id: 1, time: '09:00', customer: 'คุณแนน',   phone: '081-234-5678', service: 'นวดแผนไทย 1 ชม.', duration: 60,  status: 'confirmed', notes: '' },
  { id: 2, time: '09:30', customer: 'พี่บอล',   phone: '082-345-6789', service: 'ตัดผม',           duration: 45,  status: 'confirmed', notes: 'ลูกค้าประจำ' },
  { id: 3, time: '10:00', customer: 'น้องฝ้าย', phone: '083-456-7890', service: 'สระผม',           duration: 30,  status: 'pending',   notes: '' },
  { id: 4, time: '11:00', customer: 'คุณมาย',   phone: '084-567-8901', service: 'ทำสี',            duration: 120, status: 'confirmed', notes: 'สีแดงเบอร์กันดี' },
  { id: 5, time: '12:30', customer: 'พี่โอ้',   phone: '085-678-9012', service: 'นวดแผนไทย 1 ชม.', duration: 60,  status: 'pending',   notes: '' },
  { id: 6, time: '13:30', customer: 'คุณนิ่ม',  phone: '086-789-0123', service: 'ตัดผม',           duration: 45,  status: 'cancelled', notes: 'ติดธุระ' },
  { id: 7, time: '14:30', customer: 'คุณตาล',   phone: '087-890-1234', service: 'สระผม',           duration: 30,  status: 'confirmed', notes: '' },
  { id: 8, time: '16:00', customer: 'น้องแก้ม', phone: '088-901-2345', service: 'ทำสี',            duration: 120, status: 'confirmed', notes: 'บลอนด์อ่อน' },
];

// Dates in March 2026 that have bookings (for calendar highlight)
const BOOKED_DATES = new Set([1, 3, 4, 5, 7, 10, 11, 12, 14, 17, 18, 19, 20, 21, 22, 24, 25]);

const INITIAL_SERVICE_LIST = [
  { id: 1, name: 'นวดแผนไทย 1 ชม.', price: 350, duration: 60 },
  { id: 2, name: 'สระผม',           price: 150, duration: 30 },
  { id: 3, name: 'ตัดผม',           price: 200, duration: 45 },
  { id: 4, name: 'ทำสี',            price: 800, duration: 120 },
];

// ─── Calendar ─────────────────────────────────────────────────────────────────

const DAYS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const MONTHS_TH = [
  'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม',
];

function MonthCalendar({ year, month, selectedDay, onSelectDay }) {
  // 1-indexed month (1=Jan)
  const firstDow = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-[#12121A] border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button className="p-1.5 hover:bg-white/[0.06] rounded-lg text-zinc-500 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-white text-sm">{MONTHS_TH[month - 1]} {year + 543}</span>
        <button className="p-1.5 hover:bg-white/[0.06] rounded-lg text-zinc-500 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_TH.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-zinc-600 py-1">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;
          const hasBooking = BOOKED_DATES.has(day);
          const isToday = day === 22; // March 22, 2026 = today per system context
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`
                relative mx-auto w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all
                ${isSelected ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' :
                  isToday ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                  'text-zinc-400 hover:bg-white/[0.06] hover:text-white'}
              `}
            >
              {day}
              {hasBooking && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Add Booking Modal ─────────────────────────────────────────────────────────

function AddBookingModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    customer: '',
    phone: '',
    service: SERVICES[0].id,
    date: '2026-03-22',
    time: '10:00',
    notes: '',
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const svc = SERVICES.find(s => s.id === form.service);
    onAdd({
      id: Date.now(),
      time: form.time,
      customer: form.customer,
      phone: form.phone,
      service: svc.label,
      duration: svc.duration,
      status: 'pending',
      notes: form.notes,
    });
    onClose();
  };

  const inputCls = 'w-full bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors';
  const labelCls = 'block text-xs font-semibold text-zinc-500 mb-1.5';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-[#12121A] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            เพิ่มนัดหมาย
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-white/[0.06] rounded-lg text-zinc-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>ชื่อลูกค้า</label>
              <input required className={inputCls} placeholder="คุณ..." value={form.customer} onChange={set('customer')} />
            </div>
            <div>
              <label className={labelCls}>เบอร์โทรศัพท์</label>
              <input className={inputCls} placeholder="08X-XXX-XXXX" value={form.phone} onChange={set('phone')} />
            </div>
          </div>

          <div>
            <label className={labelCls}>บริการ</label>
            <select className={inputCls} value={form.service} onChange={set('service')}>
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.label}{s.price > 0 ? ` — ฿${s.price} (${s.duration} นาที)` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>วันที่</label>
              <input type="date" className={inputCls} value={form.date} onChange={set('date')} />
            </div>
            <div>
              <label className={labelCls}>เวลา</label>
              <input type="time" className={inputCls} value={form.time} onChange={set('time')} />
            </div>
          </div>

          <div>
            <label className={labelCls}>หมายเหตุ</label>
            <textarea className={`${inputCls} resize-none`} rows={2} placeholder="ข้อมูลเพิ่มเติม..." value={form.notes} onChange={set('notes')} />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-zinc-400 text-sm font-semibold hover:bg-white/[0.04] transition-colors">
              ยกเลิก
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold transition-colors">
              บันทึกนัดหมาย
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Booking({ setSidebarOpen }) {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [serviceList, setServiceList] = useState(INITIAL_SERVICE_LIST);
  const [selectedDay, setSelectedDay] = useState(22);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'services'
  const [autoReminder, setAutoReminder] = useState(true);

  const todayCount    = bookings.filter(b => b.status !== 'cancelled').length;
  const weekCount     = 34;
  const noShowCount   = 2;
  const revenue       = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => {
      const svc = SERVICES.find(s => s.label === b.service);
      return sum + (svc ? svc.price : 0);
    }, 0);

  const updateStatus = (id, status) =>
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));

  const addBooking = (b) => setBookings(bs => [...bs, b].sort((a, z) => a.time.localeCompare(z.time)));

  const stats = [
    { label: 'นัดวันนี้',       value: todayCount, icon: Calendar,     color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'สัปดาห์นี้',      value: weekCount,  icon: Clock,        color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'ไม่มา (no-show)', value: noShowCount, icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-500/10' },
    { label: 'รายได้จากนัด',    value: `฿${revenue.toLocaleString()}`, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <PageLayout title="นัดหมาย" setSidebarOpen={setSidebarOpen}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#12121A] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-6">
        {/* Left column: calendar + auto-reminder */}
        <div className="space-y-4">
          <MonthCalendar year={2026} month={3} selectedDay={selectedDay} onSelectDay={setSelectedDay} />

          {/* Auto-reminder toggle */}
          <div className="bg-[#12121A] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">LINE Reminder อัตโนมัติ</p>
              <p className="text-xs text-zinc-500 mt-0.5">ส่ง LINE reminder ก่อน 1 ชั่วโมงอัตโนมัติ</p>
            </div>
            <button
              onClick={() => setAutoReminder(r => !r)}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${autoReminder ? 'bg-orange-500' : 'bg-zinc-700'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoReminder ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Right column: tabs + content */}
        <div className="bg-[#12121A] border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Tab header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex gap-1 bg-[#0A0A0F] rounded-xl p-1">
              {[
                { id: 'bookings', label: 'รายการนัดหมาย' },
                { id: 'services', label: 'บริการ & ราคา' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === t.id
                      ? 'bg-orange-500 text-white shadow'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" />
              เพิ่มนัดหมาย
            </button>
          </div>

          {activeTab === 'bookings' ? (
            <BookingTable bookings={bookings} onUpdateStatus={updateStatus} />
          ) : (
            <ServiceSettings serviceList={serviceList} setServiceList={setServiceList} />
          )}
        </div>
      </div>

      {showModal && <AddBookingModal onClose={() => setShowModal(false)} onAdd={addBooking} />}
    </PageLayout>
  );
}

// ─── Booking Table ─────────────────────────────────────────────────────────────

function BookingTable({ bookings, onUpdateStatus }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.04]">
            {['เวลา', 'ลูกค้า', 'บริการ', 'ระยะเวลา', 'สถานะ', 'การดำเนินการ'].map(h => (
              <th key={h} className="text-left text-[11px] font-semibold text-zinc-600 uppercase tracking-wider px-5 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => {
            const cfg = STATUS_CFG[b.status];
            return (
              <tr key={b.id} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i === bookings.length - 1 ? 'border-0' : ''}`}>
                <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-600" />
                    {b.time}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-white">{b.customer}</p>
                  {b.phone && <p className="text-[11px] text-zinc-500 mt-0.5">{b.phone}</p>}
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-zinc-300">{b.service}</p>
                  {b.notes && <p className="text-[11px] text-zinc-600 mt-0.5 italic">{b.notes}</p>}
                </td>
                <td className="px-5 py-3.5 text-zinc-400 whitespace-nowrap">{b.duration} นาที</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                    {b.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                    {b.status === 'pending'   && <Clock        className="w-3 h-3" />}
                    {b.status === 'cancelled' && <XCircle      className="w-3 h-3" />}
                    {cfg.label}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    {b.status === 'pending' && (
                      <button
                        onClick={() => onUpdateStatus(b.id, 'confirmed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                      >
                        ยืนยัน
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(b.id, 'cancelled')}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-[11px] font-bold hover:bg-red-500/20 transition-colors border border-red-500/20"
                      >
                        ยกเลิก
                      </button>
                    )}
                    <button
                      className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                      title="ส่ง reminder"
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Service Settings ──────────────────────────────────────────────────────────

function ServiceSettings({ serviceList, setServiceList }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (svc) => { setEditId(svc.id); setEditForm({ name: svc.name, price: svc.price, duration: svc.duration }); };
  const cancelEdit = () => setEditId(null);
  const saveEdit = (id) => {
    setServiceList(sl => sl.map(s => s.id === id ? { ...s, ...editForm, price: Number(editForm.price), duration: Number(editForm.duration) } : s));
    setEditId(null);
  };
  const deleteService = (id) => setServiceList(sl => sl.filter(s => s.id !== id));

  const inputCls = 'bg-[#0A0A0F] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors';

  return (
    <div className="p-5 space-y-3">
      <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">รายการบริการทั้งหมด</p>
      {serviceList.map(svc => (
        <div key={svc.id} className="bg-[#0A0A0F] border border-white/[0.06] rounded-xl p-4">
          {editId === svc.id ? (
            <div className="space-y-3">
              <input className={`${inputCls} w-full`} value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} placeholder="ชื่อบริการ" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-600 mb-1">ราคา (฿)</label>
                  <input type="number" className={`${inputCls} w-full`} value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-600 mb-1">เวลา (นาที)</label>
                  <input type="number" className={`${inputCls} w-full`} value={editForm.duration} onChange={e => setEditForm(f => ({ ...f, duration: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => saveEdit(svc.id)} className="flex-1 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold transition-colors">บันทึก</button>
                <button onClick={cancelEdit} className="flex-1 py-1.5 rounded-lg border border-white/[0.08] text-zinc-400 text-sm hover:bg-white/[0.04] transition-colors">ยกเลิก</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{svc.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">฿{svc.price.toLocaleString()} · {svc.duration} นาที</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(svc)} className="p-1.5 rounded-lg text-zinc-500 hover:text-orange-400 hover:bg-orange-500/10 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteService(svc.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
