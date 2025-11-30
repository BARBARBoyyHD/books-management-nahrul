"use client";

import {
  CircleCheck,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "rgba(20, 20, 20, 0.65)", // darker glass
          "--normal-text": "#ffffff", // force text to white
          "--normal-border": "rgba(255, 255, 255, 0.15)",
          "--border-radius": "14px",
          color: "#ffffff",
          backdropFilter: "blur(12px)",
        } as React.CSSProperties
      }
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "shadow-xl border backdrop-blur-xl px-4 py-3 flex items-center gap-3 rounded-2xl",
          title: "font-semibold tracking-wide text-sm",
          description: "text-xs opacity-80",
          closeButton:
            "rounded-full border hover:bg-white/10 transition-colors",
        },
      }}
      {...props}
    />
  );
}
