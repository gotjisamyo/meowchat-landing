import { NextResponse } from 'next/server';
import { conversationState } from '../route';

// Stable identifier for this warm serverless instance — useful for spotting cold starts in logs.
const instanceId = process.env.VERCEL_DEPLOYMENT_ID ?? `local-${Date.now()}`;

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    webhook: 'active',
    instanceId,
    timestamp: new Date().toISOString(),
    // Number of users tracked in the current warm instance's in-memory Map.
    // Resets to 0 on every cold start (expected on Vercel serverless).
    stateMapSize: conversationState.size,
    uptime: process.uptime(),
    pricing: {
      starter: 0,
      pro: 999,
      business: 2990,
      enterprise: 'custom',
    },
  });
}
