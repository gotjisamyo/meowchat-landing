import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('LINE Webhook Received:', body);
    
    // CEO Mode: Basic response boilerplate
    // TODO: Integrate with MeowWorks backend agent
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
