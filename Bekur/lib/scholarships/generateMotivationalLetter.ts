import { LangflowClient } from "@datastax/langflow-client";
import { motivationLetterPrompt } from "./motivationalLetterPrompt";

const client = new LangflowClient({
  baseUrl: "http://localhost:7860",
  apiKey: process.env.LANGFLOW_API_KEY!,
});

export async function generateMotivationLetter(data: any) {
  const flow = client.flow(process.env.LANGFLOW_FLOW_ID!);

  const prompt = motivationLetterPrompt(data);

  const res = await flow.run({
    input_value: prompt,
    input_type: "chat",
  } as any);

  const output = res.chatOutputText();

  if (!output) throw new Error("AI generation failed");

  return output;
}
