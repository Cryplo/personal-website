"use client";

import { useRef, useState } from "react";
import { streamChat } from "@/lib/chat";
import SendMessage from "./send-message";
import BlurFade from "@/components/magicui/blur-fade";

interface Message {
    id: number,
    userSent: boolean,
    message: string,
}

const BLUR_FADE_DELAY = 0.04;

export default function ChatInterface(){
    const nextMessageId = useRef(1);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const appendMessage = (entry: Omit<Message, "id">) => {
        const messageWithId: Message = {
            ...entry,
            id: nextMessageId.current++,
        };
        setMessages((prev) => [...prev, messageWithId]);
        return messageWithId.id;
    };

    const updateMessage = (id: number, text: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, message: text } : msg
            )
        );
    };

    const receiveUserMessage = async (message: string) => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            return;
        }

        appendMessage({ userSent: true, message: trimmedMessage });
        setLoading(true);

        // Create empty bot message to stream into
        const botMessageId = appendMessage({ userSent: false, message: "" });
        let accumulatedText = "";

        try {
            await streamChat(trimmedMessage, (chunk) => {
                accumulatedText += chunk;
                updateMessage(botMessageId, accumulatedText);
            });

            // Trim final message
            if (accumulatedText.trim()) {
                updateMessage(botMessageId, accumulatedText.trim());
            } else {
                updateMessage(botMessageId, "Here's what I'd say if I could think right now");
            }
        } catch (error) {
            console.error("[ChatInterface] Failed to fetch bot reply:", error);
            updateMessage(botMessageId, "I ran into a hiccup responding. Mind trying again?");
        }
        setLoading(false);
    };

    const hasMessages = messages.length > 0;

    // Initial state - centered title and input
    if (!hasMessages) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center px-4">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <div className="flex flex-col items-center justify-center space-y-3 text-center mb-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Chat with &quot;Dylan&quot;
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground text-base">
                            This is an AI chatbot that I built based on my resume and experiences.
                            <br />
                            It does not represent my opinions or beliefs, and is purely for fun.
                        </p>
                    </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 2} className="w-full max-w-2xl">
                    <SendMessage receiveMessage={receiveUserMessage} loading={loading} />
                </BlurFade>
            </div>
        );
    }

    // Conversation state - messages with floating input at bottom
    return (
        <section className="relative mx-auto flex flex-1 w-full max-w-3xl flex-col px-4 mb-12">
            {/* Messages area - scrollable */}
            <div className="flex-1 overflow-y-auto pr-2 py-6">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.userSent ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
                                    msg.userSent
                                        ? "bg-muted text-foreground rounded-br-sm"
                                        : "text-foreground rounded-bl-sm"
                                }`}
                            >
                                <p className="whitespace-pre-line">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating input area */}
            <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-background via-background to-transparent">
                <SendMessage receiveMessage={receiveUserMessage} loading={loading} />
            </div>
        </section>
    );
}
