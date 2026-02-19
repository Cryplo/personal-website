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
                message: data.candidates?.[0]?.content?.parts?.[0]?.text.trim() ?? "Here's what I'd say if I could think right now",
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
    <section className="relative mx-auto flex flex-1 w-full max-w-3xl flex-col px-4 py-4">
      {/* Messages area */}
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col-reverse overflow-y-auto pr-2 space-y-4 space-y-reverse">
          {messages.toReversed().map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.userSent
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="mt-4 pb-4">
        <SendMessage receiveMessage={receiveUserMessage} loading={loading} />
      </div>
    </section>
  );
}
