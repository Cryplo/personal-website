'use client';

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SendIcon } from "lucide-react";
import { useState } from "react";

interface SendMessageProps {
  receiveMessage: (message: string) => void;
}

const SendMessage: React.FC<SendMessageProps> = ({ receiveMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    receiveMessage(message);
    setMessage("");
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      handleSendMessage();
    }
  }

  const handleSendPress = () => {
    handleSendMessage();
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 mx-auto mb-[8rem] flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 relative mx-auto inline-flex w-fit items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
          <DockIcon fluid className = "w-fit">
            <input type="text" placeholder="Send a message" className="h-12 px-4 min-w-[300px] md:min-w-[400px] bg-transparent border-none outline-none focus:ring-0" onChange={(event) => {setMessage(event.target.value)}} onKeyDown={(event) => handleKeyPress(event)}/>
          </DockIcon>
          <DockIcon>
            <button className="size-12" onClick={()=>handleSendPress()}>
              <SendIcon className="size-4" />
            </button>
          </DockIcon>
      </Dock>
    </div>
  );
}

export default SendMessage;