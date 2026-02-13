// utils/openai.ts
// import axios from "axios";
import { OpenAI } from "openai";
const client = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export async function generateRecipe(ingredients: string) {
  const prompt = `Suggest a simple recipe using only these ingredients: ${ingredients}. Return ingredients and instructions.

  Return the result as valid JSON in this exact format:

  {
    "name": "Recipe Name",
    "ingredients": ["ingredient 1", "ingredient 2", "..."],
    "instructions": "Step-by-step instructions."
  }
    
  with 2 line breaks after each step and a number for each step
  
  the ingredients should be displayed as a single string, like a list.`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = response.choices[0].message.content;
    console.log("Raw response:\n", content);

    // Try parsing JSON from the response
    const jsonMatch = content?.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("No valid JSON found in response.");
    }
  } catch (error: any) {
    console.error("OpenAI error:", error.message || error);
    return "⚠️ Unable to generate a recipe right now.";
  }
}
