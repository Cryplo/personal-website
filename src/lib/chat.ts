export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function streamChat(
  messages: ChatMessage[],
  onChunk: (text: string) => void
): Promise<void> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) {
    throw new Error('Failed to call API');
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine.startsWith('data:')) {
          continue;
        }

        const payload = trimmedLine.slice(5).trim();
        if (!payload || payload === '[DONE]') {
          continue;
        }

        try {
          const parsed = JSON.parse(payload);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch {
          // Ignore partial or malformed SSE payloads.
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
