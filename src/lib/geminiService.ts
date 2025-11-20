import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateChatResponse = async (userMessage: string, history?: { role: string, text: string }[]) => {
    try {
      // Use the appropriate model for chat
      const model = 'gemini-2.5-flash';
      
      // Construct the prompt with history context
      // Note: In a real prod app, we would use the chat history API properly.
      // Here we simplify for a stateless request or use a Chat session if we maintain it.
      // For this demo, let's use a fresh chat session for simplicity or reconstruct it.
      
      const systemInstruction = `
  You are Bean, an expert coffee sommelier for BrewCraft AI.
  Your goal is to help users find their perfect coffee match, or just understand about the product in general.
  - You are friendly, knowledgeable, and passionate about coffee.
  - You know about: Roast levels (Light, Medium, Dark), Flavor notes (Fruity, Nutty, Chocolatey, Floral, etc.), Origins (Ethiopia, Colombia, Brazil, Sumatra, etc.), and Brewing methods.
  - You are currently on the BrewCraft AI website, which uses AI to match users with artisan coffees.
  - Keep your responses concise (under 3 sentences ideally) and helpful.
  - If asked about shipping: "We roast to order and ship within 48 hours. Free shipping on all subscriptions!"
  - If asked about pricing: "Plans depend on the frequency of your order. The more frequently you order, the lower the price per bag."
  - If asked about the quiz: "The quiz takes 60 seconds and builds your unique taste profile."
  
  User Context: The user is browsing the website.
  `.trim();
  
      const chat = ai.chats.create({
        model,
        config: { systemInstruction },
      });
  
      // Ideally, we would replay history here, but for this simple implementation
      // we will just send the latest message. In a full app, we'd feed history.
      
      const response = await chat.sendMessage({ message: userMessage });
      
      return response.text;
    } catch (error) {
      console.error("Error calling Gemini:", error);
      return "I'm having a little trouble roasting up an answer right now. Try asking me again in a moment!";
    }
  };