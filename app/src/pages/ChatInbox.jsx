import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Bot, User, AlertCircle, ChevronDown } from 'lucide-react';
import { chatInboxData } from '../data/mockData';

// Stats derived from conversations
function getStats(conversations) {
  const bot = conversations.filter(c => c.status === 'bot').length;
  const waiting = conversations.filter(c => c.status === 'waiting').length;
  const human = conversations.filter(c => c.status === 'human').length;
  return { bot, waiting, human };
}

function ConvItem({ conv, isActive, onClick }) {
  const statusConfig = {
    bot:     { label: '🤖', cls: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
    waiting: { label: '⚠️', cls: 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' },
    human:   { label: '👤', cls: 'bg-orange-500/20 text-orange-400 border border-orange-500/30' },
  };
  const sc = statusConfig[conv.status];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-all duration-150 border-b border-white/[0.04] hover:bg-white/[0.04] ${
        isActive ? 'bg-orange-500/10 border-l-2 border-l-orange-500' : ''
      }`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
        style={{ backgroundColor: conv.customer.color }}
      >
        {conv.customer.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="font-semibold text-white text-sm truncate">{conv.customer.name}</span>
          <span className="text-zinc-500 text-xs flex-shrink-0">{conv.lastTime}</span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <span className="text-zinc-500 text-xs truncate">{conv.lastMessage}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {conv.unread > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {conv.unread}
              </span>
            )}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${sc.cls}`}>
              {sc.label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ChatBubble({ msg }) {
  if (msg.from === 'system') {
    return (
      <div className="flex justify-center my-2">
        <span className="bg-white/[0.06] text-zinc-400 text-xs px-3 py-1 rounded-full">
          {msg.text}
        </span>
      </div>
    );
  }
  if (msg.from === 'customer') {
    return (
      <div className="flex items-end gap-2 justify-start">
        <div className="max-w-[70%] bg-white/[0.08] text-zinc-200 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm">
          {msg.text}
          <span className="block text-[10px] text-zinc-500 mt-1">{msg.time}</span>
        </div>
      </div>
    );
  }
  if (msg.from === 'bot') {
    return (
      <div className="flex items-end gap-2 justify-end">
        <div className="max-w-[70%] bg-zinc-800 text-zinc-100 text-sm px-4 py-2.5 rounded-2xl rounded-br-sm">
          <span className="text-[10px] text-zinc-500 mb-1 block">🤖 บอท</span>
          {msg.text}
          <span className="block text-[10px] text-zinc-500 mt-1">{msg.time}</span>
        </div>
      </div>
    );
  }
  if (msg.from === 'owner') {
    return (
      <div className="flex items-end gap-2 justify-end">
        <div className="max-w-[70%] bg-orange-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm">
          <span className="block text-[10px] text-orange-200 mb-1">👤 คุณ</span>
          {msg.text}
          <span className="block text-[10px] text-orange-200 mt-1">{msg.time}</span>
        </div>
      </div>
    );
  }
  return null;
}

const QUICK_REPLIES = [
  'ขอบคุณครับ 🙏',
  'รอสักครู่นะครับ ⏳',
  'ส่งข้อมูลให้แล้วครับ ✅',
];

export default function ChatInbox({ setSidebarOpen }) {
  const [conversations, setConversations] = useState(chatInboxData);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const stats = getStats(conversations);
  const activeConv = conversations.find(c => c.id === activeId) || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, conversations]);

  const filtered = conversations.filter(c => {
    const matchSearch = c.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ? true :
      filter === 'waiting' ? c.status === 'waiting' :
      filter === 'human' ? c.status === 'human' : true;
    return matchSearch && matchFilter;
  });

  function now() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  function handleTakeOver() {
    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      return {
        ...c,
        status: 'human',
        messages: [
          ...c.messages,
          { id: Date.now(), from: 'system', text: 'เจ้าของร้านเข้ามาดูแลแล้ว 👋', time: now() },
        ],
      };
    }));
  }

  function handleHandBackToBot() {
    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      return {
        ...c,
        status: 'bot',
        messages: [
          ...c.messages,
          { id: Date.now(), from: 'system', text: 'โอนกลับให้บอทดูแลแล้ว 🤖', time: now() },
        ],
      };
    }));
  }

  function handleSend(text) {
    const msg = (text !== undefined ? text : inputText).trim();
    if (!msg || !activeConv || activeConv.status !== 'human') return;
    const t = now();
    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      return {
        ...c,
        lastMessage: msg,
        lastTime: t,
        messages: [
          ...c.messages,
          { id: Date.now(), from: 'owner', text: msg, time: t },
        ],
      };
    }));
    if (text === undefined) setInputText('');
    textareaRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.06] flex flex-col bg-[#0A0A0F] h-full">
        {/* Title */}
        <div className="flex items-center gap-3 px-4 pt-5 pb-3 border-b border-white/[0.04]">
          <button
            className="md:hidden p-1.5 hover:bg-white/[0.06] rounded-lg text-zinc-400"
            onClick={() => setSidebarOpen(true)}
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>
          <h2 className="font-bold text-white text-base">กล่องข้อความ</h2>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04]">
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
            🤖 {stats.bot}
          </span>
          <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-medium">
            ⚠️ {stats.waiting}
          </span>
          <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-medium">
            👤 {stats.human}
          </span>
        </div>

        {/* Search */}
        <div className="px-3 py-2.5 border-b border-white/[0.04]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ค้นหาลูกค้า..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl py-2 pl-8 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/40 transition-all"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b border-white/[0.04]">
          {[
            { id: 'all',     label: 'ทั้งหมด' },
            { id: 'waiting', label: '⚠️ รอรับสาย' },
            { id: 'human',   label: '👤 คนดูแล' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 text-[11px] py-2 font-medium transition-colors ${
                filter === tab.id
                  ? 'text-orange-400 border-b-2 border-orange-500'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-zinc-600 text-xs text-center mt-8 px-4">ไม่มีบทสนทนา</p>
          )}
          {filtered.map(conv => (
            <ConvItem
              key={conv.id}
              conv={conv}
              isActive={conv.id === activeId}
              onClick={() => setActiveId(conv.id)}
            />
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {!activeConv ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-600">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center text-3xl">
              💬
            </div>
            <p className="text-sm font-medium">เลือกบทสนทนาเพื่อเริ่มต้น</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] flex-shrink-0 bg-[#0A0A0F]/80 backdrop-blur">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ backgroundColor: activeConv.customer.color }}
                >
                  {activeConv.customer.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-sm">{activeConv.customer.name}</span>
                    <span className="text-zinc-500 text-xs">{activeConv.customer.lineId}</span>
                    {activeConv.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {activeConv.status === 'human' ? (
                      <span className="text-[11px] text-orange-400 flex items-center gap-1">
                        <User className="w-3 h-3" /> 👤 คุณกำลังดูแล
                      </span>
                    ) : activeConv.status === 'waiting' ? (
                      <span className="text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> ⚠️ รอรับสาย
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Bot className="w-3 h-3" /> 🤖 บอทกำลังดูแล
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="flex-shrink-0">
                {activeConv.status === 'human' ? (
                  <button
                    onClick={handleHandBackToBot}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-semibold transition-all"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    โอนให้บอท
                  </button>
                ) : (
                  <button
                    onClick={handleTakeOver}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold transition-all shadow-lg shadow-orange-500/25"
                  >
                    <User className="w-3.5 h-3.5" />
                    รับสาย
                  </button>
                )}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 relative">
              {activeConv.messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatBubble msg={msg} />
                </motion.div>
              ))}
              <div ref={messagesEndRef} />

              {/* Big "รับสาย" overlay when bot is in control */}
              <AnimatePresence>
                {activeConv.status !== 'human' && (
                  <motion.div
                    key="takeover-overlay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="sticky bottom-0 flex justify-center py-4"
                  >
                    <button
                      onClick={handleTakeOver}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all shadow-xl shadow-orange-500/30 active:scale-95"
                    >
                      🙋 รับสาย — เข้าดูแลเอง
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3 bg-[#0A0A0F]/80 backdrop-blur">
              {/* Quick reply chips — visible only when owner is in control */}
              {activeConv.status === 'human' && (
                <div className="flex gap-2 mb-2 flex-wrap">
                  {QUICK_REPLIES.map(qr => (
                    <button
                      key={qr}
                      onClick={() => handleSend(qr)}
                      className="text-[11px] bg-white/[0.06] hover:bg-orange-500/20 hover:text-orange-300 text-zinc-400 border border-white/[0.08] hover:border-orange-500/30 px-2.5 py-1 rounded-full transition-all"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={activeConv.status !== 'human'}
                  rows={1}
                  placeholder={
                    activeConv.status === 'human'
                      ? 'พิมพ์ข้อความ... (Enter เพื่อส่ง)'
                      : 'กด "รับสาย" ก่อนพิมพ์ข้อความ'
                  }
                  className={`flex-1 bg-white/[0.04] border rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed transition-all max-h-28 overflow-y-auto ${
                    activeConv.status === 'human'
                      ? 'border-white/[0.08] focus:border-orange-500/40'
                      : 'border-white/[0.04] opacity-50 cursor-not-allowed'
                  }`}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={activeConv.status !== 'human' || !inputText.trim()}
                  className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                    activeConv.status === 'human' && inputText.trim()
                      ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/25 active:scale-95'
                      : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
