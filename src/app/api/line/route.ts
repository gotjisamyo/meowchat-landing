import { NextResponse } from 'next/server';
import { Client, WebhookEvent, TextMessage } from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || 'xYbF9dlftMZI236ZgRaJKTlDAGK/ogXcaYOxh1laWaz612p3E+A+hKIczUuQRexR7JZCqurgYisd8HNjqJXFu4cExmjnf6UA8vyRu10ouHrPfWm99S3HgP8ItJQUT/1MXe32wa8fmjYJUFuASJGZ+QdB04t89/1O/w1cDnyilFU=',
  channelSecret: process.env.LINE_CHANNEL_SECRET || 'bcf10af6467eb012fb5df3d24b0d6de9',
};

const client = new Client(config);

// AI Response Function
async function getAIResponse(userMessage: string): Promise<string> {
  // Simple keyword-based responses (can upgrade to AI later)
  const responses: Record<string, string> = {
    'สวัสดี': 'สวัสดีค่ะ! 👋 ยินดีต้อนรับสู่ MeowChat 💕 มีอะไรให้ช่วยไหมคะ?',
    'hi': 'Hello! Welcome to MeowChat! 💕',
    'แอนนาคือใคร': 'แอนนาคือ AI Assistant ของ Mawsom ค่ะ! 😊',
    'mawsom': 'Mawsom คือบริษัท AI ที่พัฒนาโดย กฤษฐาพงศ์ (พี่ก็อต) ค่ะ 💕',
    'ราคา': 'MeowChat มี 3 แพ็กเกจ:\n\n🌟 Starter: ฟรี\n💼 Business: ฿2,990/เดือน\n🏢 Enterprise: ติดต่อฝ่ายขาย\n\nสนใจแพ็กเกจไหนคะ?',
    'ติดต่อ': 'ติดต่อได้ที่:\n📧 mawsomcto@gmail.com\n📱 061-392-6371\n\nหรือ add LINE @960xboyt ได้เลยค่ะ!',
  };

  const lowerMsg = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMsg.includes(keyword.toLowerCase())) {
      return response;
    }
  }

  return 'ขอโทษนะคะ ยังไม่เข้าใจ 😿\n\nลองถามใหม่ หรือติดต่อ mawsomcto@gmail.com ได้เลยค่ะ! 💕';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('LINE Webhook:', JSON.stringify(body, null, 2));

    const events: WebhookEvent[] = body.events || [];

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const userMessage = event.message.text;
        const replyToken = event.replyToken;

        // Get AI response
        const aiResponse = await getAIResponse(userMessage);

        // Reply to user
        const message: TextMessage = {
          type: 'text',
          text: aiResponse,
        };

        await client.replyMessage(replyToken, message);
        console.log('Replied:', aiResponse);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('LINE Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'MeowChat LINE Bot is running! 🐱' });
}
