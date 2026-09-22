import { NextResponse } from 'next/server';
import { buildPersonaPrompt } from '@/lib/persona';
import { streamAzureAIChat, type AzureAIChatMessage } from '@/lib/azure-ai';

export const runtime = 'nodejs';


export async function POST(request: Request) {
  const systemPrompt = buildPersonaPrompt();
  try {
    const { messages } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages' },
        { status: 400 }
      );
    }

    const validMessages = messages.filter(isValidChatMessage);
    if (validMessages.length !== messages.length) {
      return NextResponse.json(
        { error: 'Invalid message shape' },
        { status: 400 }
      );
    }

    const stream = await streamAzureAIChat(validMessages, systemPrompt);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });

  } catch (error) {
    console.error('Azure AI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function isValidChatMessage(message: unknown): message is AzureAIChatMessage {
  if (!message || typeof message !== 'object') {
    return false;
  }

  const candidate = message as Partial<AzureAIChatMessage>;
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string'
  );
}
