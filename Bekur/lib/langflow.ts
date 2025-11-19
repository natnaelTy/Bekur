import axios from "axios";

const YOUR_FLOW_ID = process.env.LANGFLOW_FLOW_ID;
const LANGFLOW_API = `http://localhost:7860/api/v1/run/${YOUR_FLOW_ID}`;

interface RequestStudent {
    fullName: string;
    country: string;
    fieldOfStudy: string;
    gpa: string;
    goals: string;
}

export async function findOpportunities(student: RequestStudent) {
  try {
    const res = await axios.post(LANGFLOW_API, {
      inputs: {
        fullName: student.fullName,
        country: student.country,
        fieldOfStudy: student.fieldOfStudy,
        gpa: student.gpa,
        goals: student.goals,
      },
    });

    const textOutput =
      res.data.outputs[0].outputs[0].results.message.text;

    return JSON.parse(textOutput);
  } catch (error: any) {
    console.error("Langflow error:", error.response?.data || error);
    return { matches: [] };
  }
}
