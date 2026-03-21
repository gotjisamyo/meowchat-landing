import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACTIONS = [
  { label: 'ส่ง Broadcast', emoji: '📤', page: 'marketing' },
  { label: 'ดูแชท',          emoji: '💬', page: 'inbox' },
  { label: 'เพิ่มสินค้า',    emoji: '📦', page: 'knowledge' },
  { label: 'ทดสอบบอท',       emoji: '🤖', page: 'knowledge' },
];

export default function QuickActionsFAB({ navigate }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAction = (action) => {
    setOpen(false);
    navigate(action.page);
    // Show brief toast so the user knows navigation happened
    setToast(action.label);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="fab-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-28 right-6 z-50 px-4 py-2.5 bg-zinc-800 border border-white/[0.08] rounded-xl text-sm text-white shadow-xl"
          >
            {toast} ✅
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB container — sits above FeedbackWidget (bottom-20) */}
      <div className="fixed bottom-20 right-5 z-40 flex flex-col items-end gap-2">
        {/* Speed-dial sub-buttons */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="fab-menu"
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 12 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-end gap-2 mb-1"
            >
              {ACTIONS.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ delay: i * 0.05, duration: 0.15 }}
                  onClick={() => handleAction(action)}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-800/90 hover:bg-zinc-700/90 border border-white/[0.08] hover:border-orange-500/30 rounded-2xl text-sm text-white font-semibold shadow-lg backdrop-blur-sm transition-colors whitespace-nowrap"
                >
                  <span className="text-base leading-none">{action.emoji}</span>
                  {action.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 transition-transform active:scale-95 focus:outline-none"
          style={{
            background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
          }}
          aria-label="Quick actions"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-2xl font-bold text-white leading-none select-none"
          >
            ➕
          </motion.span>
        </button>
      </div>
    </>
  );
}
