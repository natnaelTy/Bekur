import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    const baseURL = process.env.LANGFLOW_BASE_URL;
    const flowId = process.env.LANGFLOW_FLOW_ID;
    const apiToken = process.env.LANGFLOW_API_TOKEN;

    // Use /api/v1/run endpoint which is standard for v1.x and v2.x
    const apiUrl = `${baseURL}/api/v1/run/${flowId}?stream=false`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Langflow v1.5+ uses 'x-api-key'. 
    // If you are using the 'LANGFLOW_SKIP_AUTH_AUTO_LOGIN=true' bypass, 
    // this will simply be ignored by the server.
    if (apiToken) {
      headers['x-api-key'] = apiToken;
    }

    const payload = {
      input_value: message,
      input_type: 'chat',
      output_type: 'chat',
      tweaks: {} // You can add specific node adjustments here if needed
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Langflow Error (${response.status})`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    /**
     * 2025 RESPONSE EXTRACTION LOGIC:
     * Langflow returns a deeply nested object. We look for the first output
     * of the first message in the result.
     */
    const botResponse = 
      data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || 
      data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ||
      "I processed your request but couldn't find a text response.";

    return NextResponse.json({ text: botResponse });

  } catch (error: any) {
    console.error("Chat Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}