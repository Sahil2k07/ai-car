import { AiResponse } from "@/types";

class AiService {
  private readonly API_URL: string =
    process.env.API_URL || "http://localhost:8000";

  async getResponse(prompt: string, history: string[]): Promise<AiResponse> {
    const response = await fetch(`${this.API_URL}/api/public/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, history }),
    });
    if (!response.ok) {
      throw new Error("api responded with error");
    }
    const data = await response.json();
    return data;
  }
}

export default new AiService();
