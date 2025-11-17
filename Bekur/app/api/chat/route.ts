// app/api/chat/route.js

export async function POST(req: any) {
  // 1. Get the user's message from the Next.js request body
  const { message } = await req.json();

  // 2. Define your LangFlow API endpoint URL (REPLACE WITH YOUR URL!)
  const LANGFLOW_API_URL = `http://localhost:7860/api/v1/run/${process.env.LANGFLOW_API_KEY}`; // <-- PASTE YOUR URL HERE

  try {
    // 3. Forward the request to the LangFlow API
    const response = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // LangFlow expects a specific JSON body format for input
      body: JSON.stringify({
        input_value: message, // The user's message
        input_type: "text",
        output_type: "text",
      }),
    });

    // Check for non-200 responses
    if (!response.ok) {
      throw new Error(`LangFlow API error: ${response.statusText}`);
    }

    const data = await response.json();

    // 4. Extract the final LLM response from the LangFlow output
    const finalResponse = data.outputs[0].results.find(
      (result: any) => result.type === "ChatOutput"
    )?.message;

    // 5. Send the result back to your Next.js frontend
    return new Response(JSON.stringify({ response: finalResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Integration Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}