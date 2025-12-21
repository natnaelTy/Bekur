import { LangflowClient } from "@datastax/langflow-client";

const client = new LangflowClient({
  baseUrl: "http://localhost:7860",
  apiKey: process.env.LANGFLOW_API_KEY_FINDER!, 
});

export async function extractScholarship(text: string) {
  if (!text || text.trim().length === 0) {
    throw new Error("extractScholarship received empty text");
  }

  const flow = client.flow(process.env.LANGFLOW_FLOW_ID_FINDER!);

  console.log("Sending to Langflow:", text.slice(0, 200));

  const res = await flow.run(text);

  const output = res.chatOutputText();

  if (!output) {
    throw new Error("No output from Langflow");
  }

  return JSON.parse(output);
}
