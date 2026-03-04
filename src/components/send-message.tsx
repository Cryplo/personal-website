'use client';

import { cn } from "@/lib/utils";
import { SendIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

interface SendMessageProps {
  receiveMessage: (message: string) => void;
  loading?: boolean;
}

const SendMessage: React.FC<SendMessageProps> = ({ receiveMessage, loading = false }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;
    const msg = message;
    setMessage("");
    await receiveMessage(msg);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className="relative flex items-center w-full">
      <div className="relative flex w-full items-center rounded-3xl bg-[hsl(0,0%,20%)]">
        <input
          readOnly={loading}
          type="text"
          placeholder={loading ? "Thinking..." : "Ask me anything..."}
          value={message}
          className={cn(
            "flex-1 bg-transparent px-5 py-3 text-base outline-none placeholder:text-muted-foreground/70",
            loading && "cursor-not-allowed opacity-50"
          )}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => handleKeyPress(event)}
        />
        <button
          className={cn(
            "mr-3 flex size-9 items-center justify-center rounded-lg transition-colors",
            message.trim() && !loading
              ? "text-foreground hover:text-foreground/70"
              : "text-muted-foreground"
          )}
          onClick={handleSendMessage}
          disabled={!message.trim() || loading}
        >
          {loading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <SendIcon className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SendMessage;
