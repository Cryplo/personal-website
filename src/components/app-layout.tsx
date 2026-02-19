"use client";

import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "./sidebar-provider";
import Navbar from "./navbar";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function LayoutContent({ children }: { children: ReactNode }) {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <Navbar />
      {/* Toggle button - positioned at upper right of sidebar */}
      <button
        onClick={toggle}
        className={cn(
          "fixed top-5 z-40 flex size-8 items-center justify-center rounded-md border border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:bg-muted",
          isOpen ? "left-[216px]" : "left-4"
        )}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      >
        <PanelLeftIcon className={cn("size-4 transition-transform", !isOpen && "rotate-180")} />
      </button>
      <main
        className={cn(
          "flex min-h-screen flex-col transition-[margin] duration-300",
          isOpen ? "ml-64" : "ml-0"
        )}
      >
        {children}
      </main>
    </>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
