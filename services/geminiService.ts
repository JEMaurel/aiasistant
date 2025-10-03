import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // This warning helps developers during setup. The app will fail with a
  // clear error message if the key is missing or invalid.
  console.warn("API_KEY environment variable not set. The application will fail to connect to the AI service.");
}

// Initialize the AI client with the key from the environment.
// Do not use a fallback key here; it's better to fail clearly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
        // Provide more specific feedback for common API key issues.
        if (error.message.includes("API key not valid")) {
            throw new Error("The API key is invalid. Please ensure the API_KEY environment variable is set correctly.");
        }
        throw new Error(`Failed to get response from AI. Please check your network connection and API key permissions. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
