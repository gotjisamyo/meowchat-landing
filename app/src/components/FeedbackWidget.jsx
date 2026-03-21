import { useState } from 'react';

const FEATURE_OPTIONS = [
  { value: 'auto_reply', label: 'ตอบอัตโนมัติ 24/7' },
  { value: 'reports', label: 'รายงาน/สถิติ' },
  { value: 'shopee_lazada', label: 'เชื่อม Shopee/Lazada' },
  { value: 'crm', label: 'ระบบ CRM' },
  { value: 'smarter_ai', label: 'AI ตอบฉลาดขึ้น' },
  { value: 'other', label: 'อื่นๆ' },
];

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [features, setFeatures] = useState([]);
  const [problem, setProblem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleFeature = (value) => {
    setFeatures((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);

    const payload = { rating, features, problem };

    // Fire and forget — do not block on errors
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${apiUrl}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
    } catch (_err) {
      // Ignore network errors — feedback is best-effort
    }

    setSubmitting(false);
    setSubmitted(true);

    // Auto-close after 2.5 seconds
    setTimeout(() => {
      setOpen(false);
      // Reset for next session
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setHoverRating(0);
        setFeatures([]);
        setProblem('');
      }, 300);
    }, 2500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayRating = hoverRating || rating;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        title="ให้ฟีดแบค"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #8E6FBB, #B19CD9)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: '14px',
          boxShadow: '0 6px 24px rgba(142,111,187,.45)',
          transition: 'transform .2s, box-shadow .2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
          e.currentTarget.style.boxShadow = '0 10px 32px rgba(142,111,187,.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(142,111,187,.45)';
        }}
      >
        <span style={{ fontSize: '18px' }}>💬</span>
        ให้ฟีดแบค
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.35)',
            zIndex: 10000,
            animation: 'mcFadeIn .2s ease',
          }}
        />
      )}

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="แบบฟอร์มฟีดแบค"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            zIndex: 10001,
            width: '340px',
            maxWidth: 'calc(100vw - 32px)',
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 16px 56px rgba(0,0,0,.2)',
            padding: '24px',
            fontFamily: 'Nunito, sans-serif',
            animation: 'mcSlideUp .25s cubic-bezier(.22,.8,.44,1)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontWeight: 900, fontSize: '16px', color: '#5D4E6D' }}>💬 ฟีดแบค</span>
            <button
              onClick={handleClose}
              aria-label="ปิด"
              style={{
                background: 'none', border: 'none', fontSize: '20px',
                cursor: 'pointer', color: '#7A6B8A', lineHeight: 1, padding: '4px',
              }}
            >×</button>
          </div>

          {submitted ? (
            /* Success state */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🙏</div>
              <p style={{ fontWeight: 800, fontSize: '16px', color: '#5D4E6D', marginBottom: '6px' }}>ขอบคุณมากครับ!</p>
              <p style={{ fontSize: '13px', color: '#7A6B8A' }}>ฟีดแบคของคุณช่วยให้ MeowChat<br />ดีขึ้นสำหรับทุกคน</p>
            </div>
          ) : (
            <>
              {/* Star Rating */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#5D4E6D', marginBottom: '10px' }}>
                  คุณพอใจกับ MeowChat แค่ไหน? <span style={{ color: '#FFB74D' }}>*</span>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${star} ดาว`}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '28px', padding: '2px',
                        transform: displayRating >= star ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform .15s',
                        filter: displayRating >= star ? 'none' : 'grayscale(100%) opacity(0.4)',
                      }}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Checkboxes */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#5D4E6D', marginBottom: '10px' }}>
                  ฟีเจอร์ไหนที่คุณอยากได้เพิ่มที่สุด?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {FEATURE_OPTIONS.map((opt) => {
                    const checked = features.includes(opt.value);
                    return (
                      <label
                        key={opt.value}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '7px',
                          padding: '8px 10px', borderRadius: '10px',
                          border: `2px solid ${checked ? '#8E6FBB' : '#EDE8F8'}`,
                          background: checked ? '#EDE8F8' : '#FAFAF8',
                          cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                          color: checked ? '#5D4E6D' : '#7A6B8A',
                          transition: 'border-color .2s, background .2s',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFeature(opt.value)}
                          style={{ accentColor: '#8E6FBB', width: '14px', height: '14px', flexShrink: 0 }}
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Free Text */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#5D4E6D', marginBottom: '8px' }}>
                  ปัญหาที่เจอตอนนี้คืออะไร?
                </p>
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="เล่าให้ฟังได้เลยครับ..."
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '10px',
                    border: '2px solid #EDE8F8', fontFamily: 'Nunito, sans-serif',
                    fontSize: '13px', color: '#5D4E6D', resize: 'vertical',
                    outline: 'none', background: '#FAFAF8', lineHeight: 1.6,
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#B19CD9'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#EDE8F8'; }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                style={{
                  width: '100%', padding: '12px', borderRadius: '50px',
                  background: rating === 0
                    ? '#E8E0F5'
                    : 'linear-gradient(135deg, #8E6FBB, #B19CD9)',
                  color: rating === 0 ? '#B0A0C8' : '#fff',
                  border: 'none', cursor: rating === 0 ? 'not-allowed' : 'pointer',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '14px',
                  transition: 'opacity .2s, transform .2s',
                  boxShadow: rating > 0 ? '0 4px 16px rgba(142,111,187,.4)' : 'none',
                }}
              >
                {submitting ? 'กำลังส่ง...' : 'ส่งฟีดแบค 🙏'}
              </button>
            </>
          )}
        </div>
      )}

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes mcFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes mcSlideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: none } }
      `}</style>
    </>
  );
}
