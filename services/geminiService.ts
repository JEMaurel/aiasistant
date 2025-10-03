
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // In a real application, you'd want to handle this more gracefully.
  // For this environment, we assume the key is present.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

/**
 * Sends a prompt to the Gemini API and returns the response.
 * @param prompt The user's question.
 * @returns The AI's response text.
 * @throws An error if the API call fails.
 */
export const askAI = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Disable thinking for faster, more direct answers in this simple app
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get response from AI. Please check your API key and network connection. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
