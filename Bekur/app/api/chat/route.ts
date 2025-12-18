import { LangflowClient } from "@datastax/langflow-client";

const LANGFLOW_BASE_URL = "http://langflow:7860";

const FLOW_ID =
  process.env.LANGFLOW_FLOW_ID || "";
  
const API_KEY = process.env.LANGFLOW_API_KEY;

const client = new LangflowClient({
  baseUrl: LANGFLOW_BASE_URL,
  apiKey: API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  console.log("Received message:", message);

  try {
    const flow = client.flow(FLOW_ID);

    const response = await flow.run(message);

    const finalResponse = response.chatOutputText();
    console.log("Langflow response:", finalResponse);
    return new Response(JSON.stringify({ response: finalResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });


  } catch (error: any) {
    console.error("Langflow Client Error:", error);
    return new Response(
      JSON.stringify({
        error: `Langflow integration failed: ${error.message}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
