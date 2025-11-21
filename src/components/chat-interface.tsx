"use client";

import { useRef, useState } from "react";
import { generateChatResponse } from "@/lib/geminiService";
import SendMessage from "./send-message";

interface Message {
    id: number,
    userSent: boolean,
    message: string,
}

export default function ChatInterface(){
    const nextMessageId = useRef(1);
    const [messages, setMessages] = useState<Message[]>([
        {id: 0, userSent: false, message: "Hi! I'm Dylan's AI Persona"}
    ]);

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

        try {
            const botMessage = await generateChatResponse(trimmedMessage);
            appendMessage({
                userSent: false,
                message: botMessage?.trim() ?? "Here’s what I’d say if I could think right now 🙂",
            });
        } catch (error) {
            console.error("[ChatInterface] Failed to fetch bot reply:", error);
            appendMessage({
                userSent: false,
                message: "I ran into a hiccup responding. Mind trying again?",
            });
        }
    };

  return (
    <section className="relative mx-auto flex flex-1 w-full max-w-6xl flex-col gap-6 px-4 pt-10">
      <div className="flex flex-1 flex-col-reverse gap-4 min-h-0 overflow-hidden">
        <div className="flex flex-1 flex-col-reverse space-y-4 space-y-reverse overflow-y-auto pr-1 sm:pr-3 min-h-0">
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
