
'use client';

import { Dock, DockIcon } from "@/components/magicui/dock";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { generateChatResponse } from "@/lib/geminiService";
import SendMessage from "./send-message";

interface Message {
    id: number,
    userSent: boolean,
    message: string,
}

export default function ChatInterface(){
    const [availableID, setAvailableID] = useState(1);
    const [messages, setMessages] = useState<Message[]>([
        {id: 0, userSent: false, message: "Hi! I'm Dylan's AI Persona"}
    ]);

    const receiveUserMessage = async (message: string): void => {
        setMessages(
            messages.concat(
                [
                    {id: availableID, userSent: true, message: message}
                ]
            )
        );
        setAvailableID(availableID + 1);

        const botMessage = await generateChatResponse(message);
        setMessages(
            messages.concat(
                [
                    {id: availableID, userSent: false, message: botMessage}
                ]
            )
        )
        setAvailableID(availableID + 1);
    };

  return (
  <div className="fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex flex-col origin-bottom max-h-[80vh] pb-20">
    
    {/* Messages container */}
    <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={[
            "flex",
            msg.userSent ? "justify-end" : "justify-start"
          ].join(" ")}
        >
          <div
            className={[
              "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm",
              msg.userSent
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            ].join(" ")}
          >
            <p className="text-sm">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Input at bottom */}
    <div className="relative z-50">
      <SendMessage receiveMessage={receiveUserMessage} />
    </div>
  </div>
);
}
