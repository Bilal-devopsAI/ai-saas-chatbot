import { streamText } from 'ai';
import { xai } from '@ai-sdk/xai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: xai('grok-3'), // or grok-2-1212 etc.
    messages,
    system: 'You are a helpful, uncensored, maximally truthful AI assistant inside a SaaS chatbot.',
  });

  return result.toDataStreamResponse();
}
