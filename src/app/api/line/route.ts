import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || '';

const LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply';

// --- Structured logging ---
const log = (level: 'info' | 'error' | 'warn', event: string, data?: object) => {
  console.log(JSON.stringify({ level, event, timestamp: new Date().toISOString(), ...data }));
};

// --- Conversation state tracking ---
interface ConversationState {
  lastTopic: string;
  messageCount: number;
  lastSeen: Date;
}

const conversationState = new Map<string, ConversationState>();

function getOrCreateState(userId: string): ConversationState {
  if (!conversationState.has(userId)) {
    conversationState.set(userId, { lastTopic: '', messageCount: 0, lastSeen: new Date() });
  }
  return conversationState.get(userId)!;
}

function updateState(userId: string, topic: string): ConversationState {
  const state = getOrCreateState(userId);
  state.messageCount += 1;
  state.lastTopic = topic;
  state.lastSeen = new Date();
  return state;
}

// --- Signature verification ---
function verifyLineSignature(body: string, signature: string): boolean {
  if (!LINE_CHANNEL_SECRET) return false;
  const hmac = crypto.createHmac('sha256', LINE_CHANNEL_SECRET);
  hmac.update(body);
  const digest = hmac.digest('base64');
  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(Buffer.from(digest, 'base64'), Buffer.from(signature, 'base64'));
  } catch {
    return false;
  }
}

// --- Send reply via LINE Messaging API ---
async function replyMessage(replyToken: string, text: string): Promise<void> {
  const response = await fetch(LINE_REPLY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    log('error', 'LINE_REPLY_FAILED', { status: response.status, body: errorBody });
  }
}

// --- Keyword-based response engine ---
// Returns [responseText, topicLabel]
function getKeywordResponse(userMessage: string, userId: string): [string, string] {
  const msg = userMessage.trim();
  const state = getOrCreateState(userId);
  const isRepeatUser = state.messageCount > 3;
  const greeting = isRepeatUser ? 'ยินดีที่ได้คุยด้วยอีกครั้งนะครับ! 😊\n' : '';

  // Help / menu
  if (/ช่วยเหลือ|help|เมนู|menu/i.test(msg)) {
    return [
      `${greeting}สวัสดีครับ! MeowChat ช่วยได้เรื่องเหล่านี้ครับ 🐱\n\n` +
        '📦 สินค้าและสต็อก\n' +
        '💰 ราคาและแพ็กเกจ\n' +
        '🚚 การจัดส่ง\n' +
        '💳 การชำระเงิน\n' +
        '🔄 คืนสินค้า / เปลี่ยนของ\n' +
        '📅 การจองและนัดหมาย\n' +
        '🎁 โปรโมชั่นและส่วนลด\n' +
        '🕐 เวลาทำการ\n' +
        '📞 ติดต่อทีมงาน\n\n' +
        'พิมพ์หัวข้อที่ต้องการได้เลยครับ!',
      'help',
    ];
  }

  // Greeting
  if (/สวัสดี|หวัดดี|ดีครับ|ดีค่ะ|hello|hi\b/i.test(msg)) {
    return [
      `${greeting}สวัสดีครับ! ยินดีต้อนรับสู่ MeowChat 🐱\n` +
        'วันนี้สอบถามเรื่องอะไรครับ? พิมพ์ "เมนู" เพื่อดูหัวข้อทั้งหมดได้เลยครับ 😊',
      'greeting',
    ];
  }

  // Pricing / packages
  if (/ราคา|แพ็กเกจ|ค่าใช้จ่าย|ราคาเท่าไหร่|ต้องจ่าย/.test(msg)) {
    return [
      'แพ็กเกจของเรามี 4 ระดับครับ 💰\n\n' +
        '🐱 Free ฿0/เดือน — 300 ข้อความ\n' +
        '⭐ Starter ฿199/เดือน — 2,000 ข้อความ\n' +
        '🚀 Pro ฿590/เดือน — 10,000 ข้อความ\n' +
        '👑 Enterprise ฿1,990/เดือน — ไม่จำกัด\n\n' +
        'สมัครทดลองใช้ฟรีได้เลยที่ https://app.meowchat.store/register ครับ 🎉\n' +
        'อยากทราบรายละเอียดแพ็กเกจไหนเป็นพิเศษครับ?',
      'pricing',
    ];
  }

  // Register / trial
  if (/สมัคร|ทดลอง/.test(msg)) {
    return [
      'สมัครได้เลยที่ https://app.meowchat.store/register ครับ\n' +
        'ทดลองใช้ฟรีได้ทันที ไม่ต้องใช้บัตรเครดิต! 🎉\n' +
        'มีคำถามเพิ่มเติมไหมครับ?',
      'register',
    ];
  }

  // Stock / availability
  if (/มีของไหม|สินค้าหมดไหม|stock|สต็อก|ของหมด|มีสินค้า/i.test(msg)) {
    return [
      'ขอทราบรายชื่อสินค้าที่ต้องการเช็คสต็อกได้เลยครับ 📦\n' +
        'ทีมงานจะช่วยตรวจสอบให้โดยเร็วที่สุดครับ!',
      'stock',
    ];
  }

  // Order status
  if (/ออเดอร์|สั่งของ|order|คำสั่งซื้อ/i.test(msg)) {
    return [
      'ขอหมายเลขออเดอร์หรือชื่อที่ใช้สั่งซื้อได้เลยครับ 🛍️\n' +
        'ทีมงานจะช่วยตรวจสอบสถานะให้ทันทีครับ',
      'order',
    ];
  }

  // Delivery / shipping
  if (/ส่งของ|จัดส่ง|shipping|delivery|ส่งเมื่อไหร่|ส่งได้ไหม|EMS|Kerry|Flash|J&T/i.test(msg)) {
    return [
      'เราจัดส่งทุกวันทำการครับ 🚚\n\n' +
        'ขนส่งที่รองรับ: Kerry, Flash, J&T, EMS\n' +
        'ระยะเวลาจัดส่ง: 1-3 วันทำการ (กรุงเทพฯ), 2-5 วันทำการ (ต่างจังหวัด)\n\n' +
        'ต้องการสอบถามสถานะพัสดุไหมครับ? แจ้งหมายเลข Tracking ได้เลยครับ 📬',
      'delivery',
    ];
  }

  // Payment methods
  if (/จ่ายยังไง|ชำระ|โอนเงิน|บัตรเครดิต|QR code|พร้อมเพย์|PromptPay/i.test(msg)) {
    return [
      'ช่องทางชำระเงินของเรา 💳\n\n' +
        '✅ โอนเงินผ่านธนาคาร\n' +
        '✅ พร้อมเพย์ (PromptPay)\n' +
        '✅ บัตรเครดิต / เดบิต\n' +
        '✅ QR Code\n\n' +
        'ต้องการรายละเอียดบัญชีสำหรับโอนเงินไหมครับ?',
      'payment',
    ];
  }

  // Return / refund
  if (/คืนสินค้า|return|refund|เปลี่ยนของ|เสียหาย/i.test(msg)) {
    return [
      'เราเข้าใจครับ ขอโทษที่เกิดปัญหาขึ้น 🙏\n\n' +
        'นโยบายคืนสินค้าของเรา:\n' +
        '• คืนได้ภายใน 7 วันนับจากวันรับสินค้า\n' +
        '• สินค้าต้องอยู่ในสภาพเดิม ไม่ผ่านการใช้งาน\n' +
        '• กรุณาถ่ายรูปสินค้าและแจ้งปัญหาให้ทีมงานทราบ\n\n' +
        'ช่วยแจ้งรายละเอียดสินค้าและปัญหาที่พบได้เลยครับ 📸',
      'return',
    ];
  }

  // Operating hours
  if (/เปิดกี่โมง|ปิดกี่โมง|เวลาทำการ|เปิดวันไหน|วันหยุด/.test(msg)) {
    return [
      'เวลาทำการของเรา 🕐\n\n' +
        '📅 วันจันทร์ - ศุกร์: 9:00 - 18:00 น.\n' +
        '📅 วันเสาร์: 9:00 - 13:00 น.\n' +
        '❌ วันอาทิตย์และวันหยุดนักขัตฤกษ์: ปิดทำการ\n\n' +
        'นอกเวลาทำการ บอทจะช่วยตอบคำถามเบื้องต้นได้ครับ 🐱',
      'hours',
    ];
  }

  // Location / address
  if (/ที่อยู่|อยู่ที่ไหน|location|map|แผนที่|มาร้านได้ไหม/i.test(msg)) {
    return [
      'ที่ตั้งของเรา 📍\n\n' +
        'ติดต่อทีมงานเพื่อรับที่อยู่ที่ถูกต้องได้ครับ\n' +
        'LINE: @meowchat\n' +
        'อีเมล: support@meowchat.store\n\n' +
        'หรือต้องการนัดเยี่ยมชมไหมครับ? บอกวันและเวลาที่สะดวกได้เลยครับ 😊',
      'location',
    ];
  }

  // Booking / appointment
  if (/จอง|นัดหมาย|appointment|booking|คิว|ว่างไหม/i.test(msg)) {
    return [
      'ยินดีจองให้ครับ! 📅\n\n' +
        'กรุณาแจ้งข้อมูลต่อไปนี้:\n' +
        '1. วันและเวลาที่ต้องการ\n' +
        '2. จำนวนคน\n' +
        '3. ชื่อผู้จอง\n' +
        '4. เบอร์โทรติดต่อกลับ\n\n' +
        'ทีมงานจะยืนยันการจองให้ภายในไม่นานครับ 🐾',
      'booking',
    ];
  }

  // Promotion / discount
  if (/โปรโมชั่น|ส่วนลด|discount|coupon|ลดราคา/i.test(msg)) {
    return [
      'โปรโมชั่นล่าสุดของเรา 🎁\n\n' +
        '🔥 ทดลองใช้ฟรี 30 วัน ไม่มีเงื่อนไข\n' +
        '🔥 สมัคร Pro รับส่วนลด 20% เดือนแรก\n' +
        '🔥 แนะนำเพื่อน รับเครดิต ฿100\n\n' +
        'ติดตามโปรโมชั่นเพิ่มเติมได้ที่ https://app.meowchat.store ครับ\n' +
        'มีโค้ดส่วนลดอยู่แล้วไหมครับ? 😊',
      'promotion',
    ];
  }

  // Complaint
  if (/แย่|ไม่พอใจ|ร้องเรียน|complaint|ผิดหวัง/i.test(msg)) {
    return [
      'ขอโทษที่ทำให้ไม่พอใจจริงๆ ครับ 🙏\n\n' +
        'เราให้ความสำคัญกับทุก Feedback มาก\n' +
        'ช่วยเล่าให้ฟังได้เลยครับว่าเกิดอะไรขึ้น?\n\n' +
        'ทีมงานจะรีบดำเนินการแก้ไขให้โดยเร็วที่สุดครับ ❤️',
      'complaint',
    ];
  }

  // Human handoff
  if (/คุยกับคน|ติดต่อ admin|ขอคุยกับเจ้าของ|มนุษย์|คนจริงๆ/i.test(msg)) {
    return [
      'รับทราบครับ! จะส่งต่อให้ทีมงานโดยเร็วครับ 👋\n\n' +
        'ช่องทางติดต่อทีมงาน:\n' +
        '📱 LINE: @meowchat\n' +
        '📧 อีเมล: support@meowchat.store\n' +
        '🕐 เวลาทำการ: จ-ศ 9:00-18:00 น.\n\n' +
        'ระหว่างรอ ช่วยแจ้งรายละเอียดที่ต้องการสอบถามได้เลยครับ',
      'handoff',
    ];
  }

  // Support / contact (general)
  if (/ติดต่อ|support/i.test(msg)) {
    return [
      'ติดต่อทีมงานได้เลยครับ 📞\n\n' +
        '📱 LINE: @meowchat\n' +
        '📧 อีเมล: support@meowchat.store\n' +
        '🕐 เวลาทำการ: จ-ศ 9:00-18:00 น.\n\n' +
        'หรือพิมพ์คำถามที่นี่ได้เลยครับ บอทจะพยายามช่วยครับ 🐱',
      'contact',
    ];
  }

  // Thanks
  if (/ขอบคุณ|thank|ขอบใจ/i.test(msg)) {
    return [
      'ด้วยความยินดีครับ! 😊🐱\n' + 'มีอะไรให้ช่วยเพิ่มเติมไหมครับ?',
      'thanks',
    ];
  }

  // Smart fallback with topic menu
  return [
    'ขอบคุณที่ติดต่อมาครับ 🐱\n' +
      'วันนี้สอบถามเรื่องอะไรครับ?\n\n' +
      '📦 สินค้าและสต็อก\n' +
      '💰 ราคาและการชำระเงิน\n' +
      '🚚 การจัดส่ง\n' +
      '🎁 โปรโมชั่น\n' +
      '📞 ติดต่อทีมงาน\n\n' +
      'พิมพ์หัวข้อที่ต้องการได้เลยครับ',
    'unknown',
  ];
}

// --- LINE event types (minimal subset needed) ---
interface LineTextMessageEvent {
  type: 'message';
  replyToken: string;
  source?: { userId?: string };
  message: { type: 'text'; text: string };
}

interface LineFollowEvent {
  type: 'follow';
  replyToken: string;
  source?: { userId?: string };
}

interface LineUnfollowEvent {
  type: 'unfollow';
  source?: { userId?: string };
}

type LineEvent = LineTextMessageEvent | LineFollowEvent | LineUnfollowEvent | { type: string };

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Read raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get('x-line-signature') ?? '';

  // Verify signature — return 200 immediately on invalid to avoid LINE retries exposing errors
  if (!verifyLineSignature(rawBody, signature)) {
    log('error', 'LINE_INVALID_SIGNATURE');
    return NextResponse.json({ status: 'ok' });
  }

  let body: { events?: LineEvent[] };
  try {
    body = JSON.parse(rawBody) as { events?: LineEvent[] };
  } catch (err) {
    log('error', 'LINE_PARSE_FAILED', { error: String(err) });
    return NextResponse.json({ status: 'ok' });
  }

  const events: LineEvent[] = body.events ?? [];

  // Process events asynchronously; do not await to respond quickly to LINE
  void (async () => {
    for (const event of events) {
      try {
        const userId =
          (event as LineFollowEvent).source?.userId ?? `anon-${Date.now()}`;

        if (event.type === 'follow') {
          const followEvent = event as LineFollowEvent;
          updateState(userId, 'follow');
          await replyMessage(
            followEvent.replyToken,
            'สวัสดีครับ! ยินดีต้อนรับสู่ MeowChat 🐱\nพิมพ์ "เมนู" เพื่อดูว่าบอทช่วยอะไรได้บ้างครับ',
          );
          log('info', 'LINE_EVENT', { type: 'follow', userId });
        } else if (event.type === 'unfollow') {
          log('info', 'LINE_EVENT', { type: 'unfollow', userId });
        } else if (event.type === 'message') {
          const msgEvent = event as LineTextMessageEvent;
          if (msgEvent.message.type === 'text') {
            const [responseText, topic] = getKeywordResponse(msgEvent.message.text, userId);
            const state = updateState(userId, topic);
            await replyMessage(msgEvent.replyToken, responseText);
            log('info', 'LINE_EVENT', {
              type: 'message',
              userId,
              topic,
              messageCount: state.messageCount,
            });
          }
        }
      } catch (err) {
        log('error', 'LINE_EVENT_ERROR', { error: String(err) });
      }
    }
  })();

  // Respond 200 immediately so LINE does not time out
  return NextResponse.json({ status: 'ok' });
}

// Health check for LINE webhook URL verification
export async function GET(): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
