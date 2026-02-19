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
      <div className="relative flex w-full items-center rounded-3xl border border-border/70 bg-[hsl(0,0%,20%)] transition-all duration-200 focus-within:border-primary/60">
        <input
          readOnly={loading}
          type="text"
          placeholder={loading ? "Thinking..." : "Ask me anything..."}
          value={message}
          className={cn(
            "flex-1 bg-transparent px-6 py-5 text-lg outline-none placeholder:text-muted-foreground/70",
            loading && "cursor-not-allowed opacity-50"
          )}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => handleKeyPress(event)}
        />
        <button
          className={cn(
            "mr-4 flex size-11 items-center justify-center rounded-xl transition-colors",
            message.trim() && !loading
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground"
          )}
          onClick={handleSendMessage}
          disabled={!message.trim() || loading}
        >
          {loading ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : (
            <SendIcon className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SendMessage;
