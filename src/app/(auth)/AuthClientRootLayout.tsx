"use client";

import { Toaster } from "@/components/ui/sonner";
import React from "react";

interface AuthClientRootLayout {
  children: React.ReactNode;
}

/**
 * ClientAdminLayout wraps the core admin content with the Sidebar
 * provider, the sidebar component, and applies the background/glass
 * pane styling, ensuring these stateful elements are client-rendered.
 */
export default function AuthClientRootLayout({
  children,
}: AuthClientRootLayout) {
  return (
    <main
      className={`
          antialiased 
          bg-image-full 
          min-h-screen 
          flex-1 
          relative 
           backdrop-blur-lg bg-black/10"
           pl-0
        `}
    >
      {/* The glass pane effect wrapper */}
      <div className="min-h-screen ">{children}</div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
