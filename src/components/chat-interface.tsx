"use client";

import { useRef, useState } from "react";
import { callGemini } from "@/lib/gemini";
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

    const hasMessages = messages.length > 0;

    // Initial state - centered title and input
    if (!hasMessages) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center px-4">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            Chat with &quot;Dylan&quot;
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-lg">
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
        <section className="relative mx-auto flex flex-1 w-full max-w-3xl flex-col px-4">
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

            {/* Floating input area */}
            <div className="sticky bottom-0 pb-6 pt-4 bg-gradient-to-t from-background via-background to-transparent">
                <SendMessage receiveMessage={receiveUserMessage} loading={loading} />
            </div>
        </section>
    );
}
