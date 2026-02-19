import BlurFade from "@/components/magicui/blur-fade";
import ChatInterface from "@/components/chat-interface";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <section id="chat" className="flex flex-1">
        <div className="w-full flex flex-col flex-1">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Chat with me
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  This is an AI chatbot that I built based on my resume and experiences. <br />
                  It does not represent my opinions or beliefs, and is purely for fun.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade className="flex flex-col flex-1 min-h-0" delay={BLUR_FADE_DELAY * 2}>
            <ChatInterface />
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
