import { useState } from 'react';
import { Megaphone, Send, CheckCircle, Users, Filter } from 'lucide-react';

const recentBroadcasts = [
  { id: 1, title: 'New Feature: AI Knowledge Base v2', target: 'All Pro + Enterprise', sent: 98, opened: 72, date: '2026-03-15' },
  { id: 2, title: 'Scheduled Maintenance Notice', target: 'All Users', sent: 187, opened: 141, date: '2026-03-08' },
  { id: 3, title: 'Enterprise Webinar Invite', target: 'Enterprise', sent: 20, opened: 18, date: '2026-02-28' },
];

export default function SABroadcast() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!title || !message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setTitle('');
    setMessage('');
  };

  const targetLabels = { all: 'All Users (187)', pro: 'Pro Users (78)', enterprise: 'Enterprise Users (20)', free: 'Free Users (89)' };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Broadcast to All</h1>
        <p className="text-zinc-500 text-sm mt-1">ส่งประกาศและข้อความถึงลูกค้าทุกราย</p>
      </div>

      {sent && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-green-400 text-sm font-medium">ส่ง broadcast เรียบร้อยแล้ว!</p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Compose */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="w-5 h-5 text-orange-400" />
            <h2 className="text-white font-bold">Compose Broadcast</h2>
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">Target Audience</label>
            <div className="relative">
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-zinc-300 text-sm focus:outline-none focus:border-orange-500/40"
              >
                {Object.entries(targetLabels).map(([v, l]) => (
                  <option key={v} value={v} className="bg-[#1a1a1f]">{l}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">Subject / Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น: ฟีเจอร์ใหม่: AI Knowledge Base..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-orange-500/40"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">ข้อความ</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="พิมพ์ข้อความที่ต้องการส่งถึงลูกค้า..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Users className="w-4 h-4" />
              <span>จะส่งถึง: {targetLabels[target]}</span>
            </div>
            <button
              onClick={handleSend}
              disabled={!title || !message}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-900 disabled:text-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <Send className="w-4 h-4" />
              Send Now
            </button>
          </div>
        </div>

        {/* Recent broadcasts */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Recent Broadcasts</h2>
          <div className="space-y-4">
            {recentBroadcasts.map((b) => (
              <div key={b.id} className="p-4 bg-white/[0.02] rounded-xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white text-sm font-medium">{b.title}</p>
                  <span className="text-zinc-600 text-xs flex-shrink-0">{b.date}</span>
                </div>
                <p className="text-zinc-500 text-xs">{b.target}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-zinc-400">Sent: <span className="text-white font-medium">{b.sent}</span></span>
                  <span className="text-zinc-400">Opened: <span className="text-green-400 font-medium">{b.opened}</span></span>
                  <span className="text-zinc-400">Rate: <span className="text-orange-400 font-medium">{Math.round((b.opened / b.sent) * 100)}%</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
