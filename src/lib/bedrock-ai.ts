import OpenAI from 'openai';

export interface BedrockAIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const BEDROCK_MODEL = 'openai.gpt-oss-120b';

function encodeChatCompletionChunk(content: string): string {
  return `data: ${JSON.stringify({
    choices: [{ delta: { content } }],
  })}\n\n`;
}

export async function streamBedrockAIChat(
  messages: BedrockAIChatMessage[],
  systemPrompt: string
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.AWS_BEARER_TOKEN_BEDROCK;
  const baseURL = process.env.OPENAI_BASE_URL;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY or AWS_BEARER_TOKEN_BEDROCK');
  }

  if (!baseURL) {
    throw new Error('Missing OPENAI_BASE_URL');
  }

  const client = new OpenAI({
    apiKey,
    baseURL,
  });

  const stream = await client.responses.create({
    model: BEDROCK_MODEL,
    instructions: systemPrompt,
    input: messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    stream: true,
  });

  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'response.output_text.delta' && event.delta) {
            controller.enqueue(encoder.encode(encodeChatCompletionChunk(event.delta)));
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
