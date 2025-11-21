"use client";

import { useRef, useState } from "react";
import { callGemini } from "@/lib/gemini";
import SendMessage from "./send-message";

interface Message {
    id: number,
    userSent: boolean,
    message: string,
}

export default function ChatInterface(){
    const nextMessageId = useRef(1);
    const [messages, setMessages] = useState<Message[]>([
        {id: 0, userSent: false, message: "Hi! I'm Dylan's AI Persona. Feel free to ask me any questions about Dylan!"}
    ]);
    const [loading, setLoading] = useState(false);

    const appendMessage = (entry: Omit<Message, "id">) => {
        const messageWithId: Message = {
            ...entry,
            id: nextMessageId.current++,
        };
        setMessages((prev) => [...prev, messageWithId]);
    };

    const receiveUserMessage = async (message: string) => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            return;
        }

        appendMessage({ userSent: true, message: trimmedMessage });
        setLoading(true);
        try {
            const data = await callGemini(trimmedMessage);
            appendMessage({
                userSent: false,
                message: data.candidates?.[0]?.content?.parts?.[0]?.text.trim() ?? "Here’s what I’d say if I could think right now 🙂",
            });
        } catch (error) {
            console.error("[ChatInterface] Failed to fetch bot reply:", error);
            appendMessage({
                userSent: false,
                message: "I ran into a hiccup responding. Mind trying again?",
            });
        }
        setLoading(false);
    };

  return (
    <section className="relative mx-auto flex flex-1 w-full max-w-6xl flex-col px-4 pt-4">
      <div className="flex flex-1 flex-col-reverse min-h-0 overflow-auto mb-6">
        <div className="max-h-[212px] flex flex-1 flex-col-reverse space-y-4 space-y-reverse overflow-y-auto pr-1 sm:pr-3 min-h-0">
          {messages.toReversed().map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[100%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-colors ${
                  msg.userSent
                    ? "bg-muted text-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SendMessage receiveMessage={receiveUserMessage} />
    </section>
  );
}
