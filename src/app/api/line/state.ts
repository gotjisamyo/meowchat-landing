// Shared in-memory conversation state for the LINE bot.
//
// NOTE: This Map is a best-effort warm-instance cache only. On Vercel
// serverless, every cold start creates a fresh module instance, so the Map
// resets to empty. This means messageCount / lastTopic are not durable across
// cold starts. For true cross-instance persistence, replace this with
// Vercel KV (Upstash Redis) via `@vercel/kv`.
export interface ConversationState {
  lastTopic: string;
  messageCount: number;
  lastSeen: Date;
}

export const conversationState = new Map<string, ConversationState>();
