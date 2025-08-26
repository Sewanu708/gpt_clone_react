import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function main() {
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    });
    for await (const chunk of response) {
        console.log(chunk);
    }
    return response
}

