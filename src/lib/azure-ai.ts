export interface AzureAIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const AZURE_OPENAI_API_VERSION = '2024-10-21';

function normalizeAzureEndpoint(endpoint: string | undefined): string {
  if (!endpoint) {
    throw new Error('Missing AZURE_OPENAI_ENDPOINT');
  }

  return endpoint
    .replace(/\/+$/, '')
    .replace(/\/openai\/v1$/i, '')
    .replace(/\/openai$/i, '');
}

export async function streamAzureAIChat(
  messages: AzureAIChatMessage[],
  systemPrompt: string
): Promise<ReadableStream<Uint8Array>> {
  const endpoint = normalizeAzureEndpoint(process.env.AZURE_OPENAI_ENDPOINT);
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';

  if (!apiKey) {
    throw new Error('Missing AZURE_OPENAI_API_KEY');
  }

  const response = await fetch(
    `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Azure OpenAI request failed (${response.status}): ${errorText}. Endpoint=${endpoint}, deployment=${deploymentName}`
    );
  }

  if (!response.body) {
    throw new Error('Azure OpenAI response body is missing');
  }

  return response.body;
}
