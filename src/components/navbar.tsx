"use client";

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
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-provider";

export default function Navbar() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full w-56 flex-col border-r border-border/40 bg-[hsl(0,0%,9%)] transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header / Logo Area */}
      <div className="flex h-[72px] items-center border-b border-border/40 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold">{DATA.name}</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {DATA.navbar.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="size-5" />
                  <span>{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="md:hidden">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Social Links / Footer */}
      <div className="border-border/40 p-4">
        <Separator className="mb-3" />
        <div className="flex flex-wrap gap-2">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <Tooltip key={name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    target="_blank"
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10"
                    )}
                  >
                    <social.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            ))}
        </div>
      </div>
    </aside>
  );
}
