import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google Generative AI with your API key
// Store this in environment variables for security

export async function POST(req: NextRequest) {
  try {
    const { field, prompt, context } = await req.json();

    if (!field || !prompt) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Google Generative AI API key is not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(key);

    // Select the appropriate model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create the full prompt with context if available
    let fullPrompt = prompt;
    if (context) {
      fullPrompt = `${prompt}\n\nContext: ${context}`;
    }

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ field, content: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
