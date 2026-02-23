"use client";

import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "./sidebar-provider";
import Navbar from "./navbar";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function LayoutContent({ children }: { children: ReactNode }) {
  const { isOpen, isMobile, toggle, setIsOpen } = useSidebar();

  return (
    <>
      <Navbar />
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Toggle button - positioned at upper right of sidebar */}
      <button
        onClick={toggle}
        className={cn(
          "fixed top-5 z-40 flex size-8 items-center justify-center rounded-md transition-all duration-300 text-muted-foreground hover:text-foreground",
          isOpen ? "left-[180px]" : "left-4"
        )}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      >
        <PanelLeftIcon className={cn("size-4 transition-transform", !isOpen && "rotate-180")} />
      </button>
      <main
        className={cn(
          "flex min-h-screen flex-col transition-[margin] duration-300",
          isOpen && !isMobile ? "ml-56" : "ml-0"
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
