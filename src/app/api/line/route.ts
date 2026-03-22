import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || '';

const LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply';

// Verify LINE signature to ensure request is from LINE platform
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

// Send reply message via LINE Messaging API
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
    console.error('LINE reply failed:', response.status, errorBody);
  }
}

// Keyword-based response for text messages
function getKeywordResponse(userMessage: string): string {
  const msg = userMessage.trim();

  if (/สวัสดี|หวัดดี/.test(msg)) {
    return 'สวัสดีครับ! 😊 วันนี้ช่วยอะไรได้บ้างครับ?';
  }
  if (/ราคา|แพ็กเกจ/.test(msg)) {
    return 'แพ็กเกจของเรามี 3 ระดับ:\n🐱 Free ฿0/เดือน (300 ข้อความ)\n🚀 Pro ฿590/เดือน (10,000 ข้อความ)\n👑 Enterprise ฿1,990/เดือน (ไม่จำกัด)\nสมัครฟรีได้ที่ https://app.meowchat.store/register ครับ 🐾';
  }
  if (/สมัคร|ทดลอง/.test(msg)) {
    return 'สมัครได้เลยที่ https://app.meowchat.store/register ครับ ทดลองใช้ฟรี! 🎉';
  }
  if (/ติดต่อ|support/i.test(msg)) {
    return 'ติดต่อทีมงานได้ที่ LINE: @meowchat หรืออีเมล support@meowchat.store ครับ';
  }

  return 'ขอบคุณที่ติดต่อมาครับ 🐱 ทีมงานจะตอบกลับโดยเร็ว!';
}

// LINE event types (minimal subset needed)
interface LineTextMessageEvent {
  type: 'message';
  replyToken: string;
  message: { type: 'text'; text: string };
}

interface LineFollowEvent {
  type: 'follow';
  replyToken: string;
}

interface LineUnfollowEvent {
  type: 'unfollow';
}

type LineEvent = LineTextMessageEvent | LineFollowEvent | LineUnfollowEvent | { type: string };

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Read raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get('x-line-signature') ?? '';

  // Verify signature — return 200 immediately on invalid to avoid LINE retries exposing errors
  if (!verifyLineSignature(rawBody, signature)) {
    console.error('LINE webhook: invalid signature');
    return NextResponse.json({ status: 'ok' });
  }

  let body: { events?: LineEvent[] };
  try {
    body = JSON.parse(rawBody) as { events?: LineEvent[] };
  } catch (err) {
    console.error('LINE webhook: failed to parse body', err);
    return NextResponse.json({ status: 'ok' });
  }

  const events: LineEvent[] = body.events ?? [];

  // Process events asynchronously; do not await to respond quickly to LINE
  void (async () => {
    for (const event of events) {
      try {
        if (event.type === 'follow') {
          const followEvent = event as LineFollowEvent;
          await replyMessage(
            followEvent.replyToken,
            'สวัสดีครับ! ยินดีต้อนรับสู่ MeowChat 🐱 พิมพ์ \'ช่วยเหลือ\' เพื่อดูเมนูได้เลยครับ',
          );
          console.log('LINE follow event handled');
        } else if (event.type === 'unfollow') {
          // No reply for unfollow; just log
          console.log('LINE unfollow event received');
        } else if (event.type === 'message') {
          const msgEvent = event as LineTextMessageEvent;
          if (msgEvent.message.type === 'text') {
            const responseText = getKeywordResponse(msgEvent.message.text);
            await replyMessage(msgEvent.replyToken, responseText);
            console.log('LINE message replied:', responseText);
          }
        }
      } catch (err) {
        console.error('LINE event processing error:', err);
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
